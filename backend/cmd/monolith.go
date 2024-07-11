package main

import (
	"keybook/backend/internal/frontend"
	"keybook/backend/internal/handlers"
	"keybook/backend/internal/repositories"
	"log"
	"net/http"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"go.uber.org/dig"
)

func startFrontend() {
	mux := http.NewServeMux()
	mux.Handle("/", frontend.SvelteKitHandler("/"))
	log.Fatal(http.ListenAndServe(":5050", mux))
}

func startBackend() {
	container := dig.New()
	container.Provide(pocketbase.New)
	container.Provide(repositories.NewPersonRepository)
	container.Provide(repositories.NewPersonDeviceRepository)
	container.Provide(handlers.NewDeviceHandlers)

	container.Invoke(func(
		app *pocketbase.PocketBase,
		personRepository repositories.IPersonRepository,
		deviceHandlers handlers.IDeviceHandlers,
	) {
		// serves static files from the provided public dir (if exists)
		app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
			e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))

			handlers.AddDeviceHandlersToRouter(e.Router, deviceHandlers)
			return nil
		})

		app.OnModelAfterCreate("users").Add(func(e *core.ModelEvent) error {
			personRepository.CreatePersonForUser(e.Model.GetId())
			return nil
		})

		if err := app.Start(); err != nil {
			log.Fatal(err)
		}
	})
}

func main() {
	go startFrontend()
	startBackend()
}
