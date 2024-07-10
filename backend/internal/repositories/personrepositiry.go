package repositories

type IPersonRepository interface {
}

type PersonRepository struct{}

func (p PersonRepository) CreatePersonForUser(userId string) {
	//newPerson := models.
}

func NewPersonRepository() IPersonRepository {
	return PersonRepository{}
}
