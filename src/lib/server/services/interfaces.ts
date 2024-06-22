import type { AddDeviceAndHistoriesDTO } from "$lib/dtos";

export interface IBackendServices<S> {
  create: <T extends {}>(collectionName: string, data: T, newIdOut: { id: string }) => void;
  search: <T extends {}>(collectionName: string, searchCriteria: S) => Promise<T[]>;
  view: <T extends {}>(collectionName: string, recordID: string) => T | null;
  update: <T extends {}>(collectionName: string, data: T) => void;
  delete: <T extends {}>(collectionName: string, data: T) => void;
}

export interface IPropertyServices {
  addPropertyIfNotExists: (propertyAddress: string, newIdOut: {id:string}) => void;
}

export interface IPersonServices {
  addPersonByNameIfNotExists: (personNames: string[]) => void;
}

export interface IPersonDeviceServices {
  addDevicesByIdentificationAndNameIfNotExists: (
    devices: AddDeviceAndHistoriesDTO[],
    propertyId: {id:string}
  ) => void;
}

export interface IDataImportServices {
  importCsv: (csvText: string) => void;
}