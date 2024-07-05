package api

import (
	"keybook/backend/api/handlers"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

type modifiedPockBaseApp struct {
	*pocketbase.PocketBase
}

func NewModifiedPockBaseApp() *modifiedPockBaseApp {
	var app = modifiedPockBaseApp{
		PocketBase: pocketbase.New(),
	}

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))

		handlers.SetDeviceHandlers(e.Router)
		return nil
	})

	return &app
}
