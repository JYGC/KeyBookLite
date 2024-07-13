package repositories

import (
	"fmt"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/models"
)

type IPersonRepository interface {
	GetPersonForUser(loggedInUser *models.Record) (*models.Record, error)
	CreatePersonForUser(userId string) error
}

type PersonRepository struct {
	app *pocketbase.PocketBase
}

func (p PersonRepository) GetPersonForUser(loggedInUser *models.Record) (*models.Record, error) {
	return p.app.Dao().FindFirstRecordByFilter(
		"persons",
		"user = {:user}",
		dbx.Params{"user": loggedInUser.Get("id")},
	)
}

func (p PersonRepository) CreatePersonForUser(userId string) error {
	user, findUserErr := p.app.Dao().FindRecordById("users", userId)
	if findUserErr != nil {
		fmt.Printf("findUserErr: %v\n", findUserErr)
		return findUserErr
	}

	personsCollection, findCollectionErr := p.app.Dao().FindCollectionByNameOrId("persons")
	if findCollectionErr != nil {
		fmt.Printf("findCollectionErr: %v\n", findCollectionErr)
		return findCollectionErr
	}
	newPerson := models.NewRecord(personsCollection)
	newPerson.Set("name", user.Get("name"))
	newPerson.Set("user", user.Get("id"))
	if addPersonError := p.app.Dao().SaveRecord(newPerson); addPersonError != nil {
		fmt.Printf("addPersonError: %v\n", addPersonError)
		return addPersonError
	}

	return nil
}

func NewPersonRepository(app *pocketbase.PocketBase) IPersonRepository {
	return PersonRepository{
		app: app,
	}
}
