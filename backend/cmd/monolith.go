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
	container.Provide(
		repositories.NewPersonDeviceRepository,
		dig.As(new(repositories.IPersonDeviceRepository)),
		dig.Name("PersonDeviceRepository"),
	)
	container.Provide(
		handlers.NewDeviceHandlers,
		dig.As(new(handlers.IDeviceHandlers)),
		dig.Name("DeviceHandlers"),
	)

	app := pocketbase.New()
	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))

		err := container.Invoke(handlers.InvokeDeviceHandlers(e.Router))
		if err != nil {
			fmt.Printf("err: %v\n", err)
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
