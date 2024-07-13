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
	PersonRepository   repositories.IPersonRepository
	PropertyRepository repositories.IPropertyRepository
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

	fmt.Printf("personNames: %v\n", personNames)

	loggedInPerson, _ := d.PersonRepository.GetPersonForUser(loggedInUser)
	fmt.Printf("loggedInPerson: %v\n", loggedInPerson)

	return nil
}

func NewDataImportServices(
	personRepository repositories.IPersonRepository,
	propertyRepository repositories.IPropertyRepository,
) IDataImportServices {
	dataImportServices := DataImportServices{}
	dataImportServices.PersonRepository = personRepository
	dataImportServices.PropertyRepository = propertyRepository
	return dataImportServices
}
