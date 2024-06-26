import type { AddDeviceAndHistoriesDTO, DeviceIdNameIdentifierAndTypeDTO, IQueryParameters } from "$lib/dtos";

export interface IBackendServices {
  create: <T extends object>(collectionName: string, data: T, newIdOut: { id: string }) => void;
  search: <T extends object>(collectionName: string, searchCriteria: IQueryParameters) => Promise<T[]>;
  view: <T extends object>(collectionName: string, recordID: string) => T | null;
  update: <T extends object>(collectionName: string, data: T) => void;
  delete: <T extends object>(collectionName: string, data: T) => void;
}

export interface IPropertyServices {
  addPropertyIfNotExistsIgnoreHistory: (propertyAddress: string, newIdOut: {id:string}) => void;
}

export interface IPersonServices {
  addPersonByNameIfNotExistsIgnoreHistory: (personNames: string[]) => void;
}

export interface IDeviceServices {
  getDevicesByNamesAndIdentifiers: (
    devicesWithNameAndIdentifier: DeviceIdNameIdentifierAndTypeDTO[],
    propertyId: string
  ) => Promise<DeviceIdNameIdentifierAndTypeDTO[]>;
  
  addDevicesIfNotExistsIgnoreHistory: (
    devicesAndHistories: AddDeviceAndHistoriesDTO[],
    propertyId: string,
    newDeviceIdsOut: { id:string }[]
  ) => void
}

export interface IPersonDeviceServices {
  addDevicesByIdentificationAndNameIfNotExists: (
    devicesAndHistories: AddDeviceAndHistoriesDTO[],
    propertyId: string
  ) => void;
}

export interface IDataImportServices {
  importCsv: (csvText: string) => void;
}