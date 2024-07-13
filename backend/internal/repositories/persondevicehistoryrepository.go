package repositories

import (
	"encoding/json"
	"fmt"

	"github.com/ostafen/clover/v2"
	"github.com/ostafen/clover/v2/document"
	"github.com/pocketbase/pocketbase/models"
)

type IPersonDeviceHistoryRepository interface {
	AddPersonDeviceHistory(personDevice models.Model) (string, error)
}

type PersonDeviceHistoryRepository struct {
	historyDb *clover.DB
}

func (p PersonDeviceHistoryRepository) AddPersonDeviceHistory(personDevice models.Model) (string, error) {
	personDeviceJson, marshalErr := json.Marshal(personDevice)
	if marshalErr != nil {
		return "", marshalErr
	}

	var personDeviceMap map[string]interface{}
	json.Unmarshal([]byte(personDeviceJson), &personDeviceMap)

	newDocument := document.NewDocument()
	newDocument.SetAll(personDeviceMap)

	fmt.Printf("newDocument: %v\n", newDocument)
	newDocId, insertErr := p.historyDb.InsertOne("persondevicehistory", newDocument)
	if insertErr != nil {
		return "", insertErr
	}

	return newDocId, nil
}

func NewPersonDeviceHistoryRepository(historyDb *clover.DB) IPersonDeviceHistoryRepository {
	return PersonDeviceHistoryRepository{
		historyDb,
	}
}
