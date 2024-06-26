export interface IQueryParameters {
  page: number;
  perPage: number;
  parameters: {
    expand: string | null,
    fields: string | null,
    filter: string | null
  };
}

export interface PersonNameDTO {
  name: string;
}

export interface AddPersonDTO {
  name: string;
  type: string;
}

export interface AddDeviceAndHistoriesDTO {
  name: string;
  identifier: string;
  type: string;
  defunctReason: string;
  currentHolder: string | null;
  deviceHistories: object[];
  personDeviceHistories: {
    deviceHolder: string | null;
    dateSpecified: Date;
    actionDescription: string;
  }[]
}

export interface DeviceIdNameIdentifierAndTypeDTO {
  name: string,
  identifier: string,
  type: string,
}