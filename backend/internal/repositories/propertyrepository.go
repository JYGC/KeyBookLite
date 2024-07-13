package repositories

import (
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/models"
)

type IPropertyRepository interface {
	GetPropertyIdByName(propertyAddress string) (string, error)
	AddNewProperty(owner *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error)
}

type PropertyRepository struct {
	app *pocketbase.PocketBase
}

func (p PropertyRepository) GetPropertyIdByName(propertyAddress string) (string, error) {
	property, err := p.app.Dao().FindFirstRecordByFilter(
		"properties",
		"address = {:address}",
		dbx.Params{"address": propertyAddress},
	)
	if err != nil {
		return "", err
	}
	return property.Get("id").(string), nil
}

func (p PropertyRepository) AddNewProperty(owner *models.Record, propertyAddress string, startOfOwnership time.Time) (string, error) {
	propertiesCollection, findPropertiesCollectionErr := p.app.Dao().FindCollectionByNameOrId("properties")
	if findPropertiesCollectionErr != nil {
		return "", findPropertiesCollectionErr
	}
	newProperty := models.NewRecord(propertiesCollection)
	newProperty.Set("address", propertyAddress)

	ownershipsCollection, findOwnershipsCollectionErr := p.app.Dao().FindCollectionByNameOrId("ownerships")
	if findOwnershipsCollectionErr != nil {
		return "", findOwnershipsCollectionErr
	}
	newOwnership := models.NewRecord(ownershipsCollection)
	newOwnership.Set("startdate", startOfOwnership)
	return "", nil
}

func NewPropertyRepository() IPropertyRepository {
	propertyRepository := PropertyRepository{}
	return propertyRepository
}
