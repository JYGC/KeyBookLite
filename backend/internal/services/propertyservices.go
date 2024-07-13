package services

import (
	"errors"
	"keybook/backend/internal/repositories"
	"time"

	"github.com/pocketbase/pocketbase/models"
)

type IPropertyServices interface{}

type PropertyServices struct {
	propertyRepository repositories.IPropertyRepository
}

func (p PropertyServices) AddPropertyIfNotExists(owner *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error) {
	propertyId, getPropertyByNameErr := p.propertyRepository.GetPropertyIdByName(propertyAddress)
	if getPropertyByNameErr != nil {
		return "", getPropertyByNameErr
	}
	if propertyId != "" {
		return propertyId, errors.New("psroperty exists")
	}
	return p.propertyRepository.AddNewProperty(owner, propertyAddress, startOfOwnership)
}

func NewPropertyServices(propertyRepository repositories.IPropertyRepository) IPropertyServices {
	propertyServices := PropertyServices{}
	propertyServices.propertyRepository = propertyRepository
	return propertyServices
}
