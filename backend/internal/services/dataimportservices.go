package services

import (
	"encoding/json"
	"fmt"
	"keybook/backend/internal/dtos"
	"keybook/backend/internal/repositories"
	"strings"

	"github.com/pocketbase/pocketbase/models"
)

// all db calls here must have dao := app.Dao().WithoutHooks()

type IDataImportServices interface {
	ProcessImportData(loggedInUserId *models.Record, importDateJson []byte) error
}

type DataImportServices struct {
	personRepository repositories.IPersonRepository
	propertyServices IPropertyServices
}

func (d DataImportServices) ProcessImportData(loggedInUser *models.Record, importDateJson []byte) error {
	var importDataDto dtos.AddPropertyDeviceAndHistoriesDto
	json.Unmarshal(importDateJson, &importDataDto)

	personNames := make(map[string]string)
	for _, dpdh := range importDataDto.DevicesPersonDevicesAndHistories {
		for _, pdh := range dpdh.PersonDeviceHistories {
			if strings.TrimSpace(pdh.DeviceHolder) != "" {
				personNames[pdh.DeviceHolder] = pdh.DeviceHolder
			}
		}
	}

	fmt.Printf("loggedInUser: %v\n", loggedInUser)
	//d.propertyServices.AddPropertyIfNotExists(loggedInUser, importDataDto.PropertyAddress, time.Now())

	return nil
}

func NewDataImportServices(
	personRepository repositories.IPersonRepository,
	propertyServices IPropertyServices,
) IDataImportServices {
	return DataImportServices{
		personRepository,
		propertyServices,
	}
}
