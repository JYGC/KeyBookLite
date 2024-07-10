package main

import (
	"fmt"
	"keybook/backend/internal/handlers"
	"keybook/backend/internal/repositories"
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"go.uber.org/dig"
)

func main() {
	container := dig.New()
	container.Provide(repositories.NewPersonRepository)
	container.Provide(repositories.NewPersonDeviceRepository)
	container.Provide(handlers.NewDeviceHandlers)

	app := pocketbase.New()

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))

		if errInvokeDeviceHandlers := container.Invoke(handlers.InvokeDeviceHandlers(e.Router)); errInvokeDeviceHandlers != nil {
			fmt.Printf("err: %v\n", errInvokeDeviceHandlers)
		}
		return nil
	})

	app.OnModelAfterCreate("users").Add(func(e *core.ModelEvent) error {
		fmt.Println(e.Model.TableName())
		fmt.Println(e.Model.GetId())
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
