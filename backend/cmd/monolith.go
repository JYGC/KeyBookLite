package main

import (
	"keybook/backend/api"
	"log"
)

func main() {
	app := api.NewModifiedPockBaseApp()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
