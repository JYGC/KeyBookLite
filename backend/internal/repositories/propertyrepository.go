package repositories

import (
	"fmt"
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

	id1 := newProperty.Get("id")
	fmt.Printf("id1: %v\n", id1)
	if saveRecordErr := p.app.Dao().SaveRecord(newProperty); saveRecordErr != nil {
		return "", saveRecordErr
	}
	id2 := newProperty.Get("id")
	fmt.Printf("id2: %v\n", id2)

	return id2.(string), nil
}

func NewPropertyRepository(app *pocketbase.PocketBase) IPropertyRepository {
	propertyRepository := PropertyRepository{
		app,
	}
	return propertyRepository
}
