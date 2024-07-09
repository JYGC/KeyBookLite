package handlers

import (
	"encoding/json"
	"fmt"
	"keybook/backend/internal/dtos"
	"keybook/backend/internal/repositories"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
)

type IDeviceHandlers interface {
	ImportCsv(context echo.Context) error
}

type DeviceHandlers struct {
	PersonDeviceRepository repositories.IPersonDeviceRepository
}

func (d DeviceHandlers) ImportCsv(context echo.Context) error {
	csvContent := apis.RequestInfo(context).Data
	csvContentJson, csvContentJsonErr := json.Marshal(csvContent)
	if csvContentJsonErr != nil {
		fmt.Printf("err: %v\n", csvContentJsonErr)
	}
	var csvContentDto dtos.AddPropertyDeviceAndHistoriesDto
	json.Unmarshal(csvContentJson, &csvContentDto)
	//
	hason, hasonErr := json.Marshal(csvContentDto)
	if hasonErr != nil {
		fmt.Printf("hasonErr: %v\n", hasonErr)
	}
	fmt.Printf("string(hason): %v\n", string(hason))
	return nil
}

func NewDeviceHandlers(personDeviceRepository repositories.IPersonDeviceRepository) IDeviceHandlers {
	deviceHandlers := DeviceHandlers{}
	deviceHandlers.PersonDeviceRepository = personDeviceRepository
	return deviceHandlers
}

func InvokeDeviceHandlers(router *echo.Echo) func(IDeviceHandlers) {
	return func(deviceHandlers IDeviceHandlers) {
		router.POST("/api/device/importcsv", deviceHandlers.ImportCsv)
	}
}
