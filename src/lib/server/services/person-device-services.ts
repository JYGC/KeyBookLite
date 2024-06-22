import type { AddDeviceAndHistoriesDTO } from "$lib/dtos";
import type { IQueryParameters } from "./backend-services";
import type { IBackendServices, IPersonDeviceServices, IPersonServices } from "./interfaces";

export class PersonDeviceServices implements IPersonDeviceServices {
  private readonly __backendService: IBackendServices<IQueryParameters>;
  private readonly __personService: IPersonServices;

  constructor (backendService: IBackendServices<IQueryParameters>, personService: IPersonServices) {
    this.__backendService = backendService;
    this.__personService = personService;
  }

  addDevicesByIdentificationAndNameIfNotExists = async (
    devices: AddDeviceAndHistoriesDTO[], 
    propertyId: {id:string}
  ) => {
    console.table(propertyId);
  };

}