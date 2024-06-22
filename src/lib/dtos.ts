export interface PersonNameDTO {
  name: string;
}

export interface AddPersonDTO {
  name: string;
  type: string;
}

export interface AddDeviceAndHistoriesDTO {
  name: string,
  identifier: string,
  type: string,
  defunctReason: string,
  currentHolder: string | null,
  deviceHistories: {}[],
  personDeviceHistories: {
    deviceHolder: string | null,
    dateSpecified: Date,
    actionDescription: string
  }[]
}