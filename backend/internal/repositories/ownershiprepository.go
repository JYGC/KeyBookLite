package repositories

import (
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/models"
)

type IOwnershipRepository interface{}

type OwnershipRepository struct {
	app *pocketbase.PocketBase
}

func (o OwnershipRepository) AddOwnership(ownerPersonId string, propertyId string, startOfOwnership time.Time) (string, error) {
	ownershipsCollection, findCollectionErr := o.app.Dao().FindCollectionByNameOrId("ownerships")
	if findCollectionErr != nil {
		return "", findCollectionErr
	}

	newOwnership := models.NewRecord(ownershipsCollection)
	newOwnership.Set("owner", ownerPersonId)
	newOwnership.Set("property", propertyId)
	newOwnership.Set("startdate", startOfOwnership)

	if saveRecordErr := o.app.Dao().SaveRecord(newOwnership); saveRecordErr != nil {
		return "", saveRecordErr
	}

	return newOwnership.Get("id").(string), nil
}

func NewOwnershipRepository(app *pocketbase.PocketBase) IOwnershipRepository {
	return OwnershipRepository{
		app,
	}
}
