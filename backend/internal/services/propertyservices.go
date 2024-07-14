package services

import (
	"fmt"
	"keybook/backend/internal/repositories"
	"time"

	"github.com/pocketbase/pocketbase/models"
)

type IPropertyServices interface {
	AddPropertyIfNotExists(ownerUser *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error)
}

type PropertyServices struct {
	personRepository   repositories.IPersonRepository
	propertyRepository repositories.IPropertyRepository
}

func (p PropertyServices) AddPropertyIfNotExists(loggedInUser *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error) {
	loggedInPerson, _ := p.personRepository.GetPersonForUser(loggedInUser)
	fmt.Printf("loggedInPerson: %v\n", loggedInPerson)

	propertyId, getPropertyByNameErr := p.propertyRepository.GetPropertyIdByName(propertyAddress)
	if getPropertyByNameErr != nil {
		return "", getPropertyByNameErr
	}
	if propertyId != "" {
		return propertyId, nil
	}
	return p.propertyRepository.AddNewProperty(loggedInUser, propertyAddress, startOfOwnership)
}

func NewPropertyServices(
	personRepository repositories.IPersonRepository,
	propertyRepository repositories.IPropertyRepository,
) IPropertyServices {
	propertyServices := PropertyServices{}
	propertyServices.personRepository = personRepository
	propertyServices.propertyRepository = propertyRepository
	return propertyServices
}
