package repositories

type IPersonDeviceRepository interface {
}

type PersonDeviceRepository struct {
}

func NewPersonDeviceRepository() IPersonDeviceRepository {
	personDeviceRepository := PersonDeviceRepository{}
	return personDeviceRepository
}
