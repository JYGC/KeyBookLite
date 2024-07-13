package services

import (
	"errors"
	"keybook/backend/internal/repositories"
	"time"

	"github.com/pocketbase/pocketbase/models"
)

type IPropertyServices interface{}

type PropertyServices struct {
	PropertyRepository repositories.IPropertyRepository
}

func (p PropertyServices) AddPropertyIfNotExists(owner *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error) {
	propertyId, getPropertyByNameErr := p.PropertyRepository.GetPropertyIdByName(propertyAddress)
	if getPropertyByNameErr != nil {
		return "", getPropertyByNameErr
	}
	if propertyId != "" {
		return propertyId, errors.New("psroperty exists")
	}
	return p.PropertyRepository.AddNewProperty(owner, propertyAddress, startOfOwnership)
}

func NewPropertyServices(propertyRepository repositories.IPropertyRepository) IPropertyServices {
	propertyServices := PropertyServices{}
	propertyServices.PropertyRepository = propertyRepository
	return propertyServices
}
