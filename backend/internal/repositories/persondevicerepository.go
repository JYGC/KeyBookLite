package repositories

import (
	"encoding/json"
	"fmt"
	"keybook/backend/internal/dtos"
)

type IPersonDeviceRepository interface {
	ProcessImportData(importData dtos.AddPropertyDeviceAndHistoriesDto) error
}

type PersonDeviceRepository struct {
}

func (d PersonDeviceRepository) ProcessImportData(importData dtos.AddPropertyDeviceAndHistoriesDto) error {
	hason, hasonErr := json.Marshal(importData)
	if hasonErr != nil {
		fmt.Printf("hasonErr: %v\n", hasonErr)
	}
	fmt.Printf("string(hason): %v\n", string(hason))
	return nil
}

func NewPersonDeviceRepository() IPersonDeviceRepository {
	personDeviceRepository := PersonDeviceRepository{}
	return personDeviceRepository
}
