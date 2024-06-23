import type { AddDeviceAndHistoriesDTO } from "$lib/dtos";
import { inject, injectable } from "tsyringe";
import type {
  IBackendServices,
  IPersonDeviceServices,
  IPersonServices,
  IDeviceServices
} from "./interfaces";

@injectable()
export class PersonDeviceServices implements IPersonDeviceServices {
  constructor (
    @inject("IBackendServices") private __backendService: IBackendServices,
    @inject("IPersonServices") private __personService: IPersonServices,
    @inject("IDeviceServices") private __deviceService: IDeviceServices
  ) { }

  addDevicesByIdentificationAndNameIfNotExists = async (
    devicesAndHistories: AddDeviceAndHistoriesDTO[],
    propertyId: string
  ) => {
    const newDeviceIdsOut: { id:string }[] = [];
    await this.__deviceService.addDevicesIfNotExistsIgnoreHistory(devicesAndHistories, propertyId, newDeviceIdsOut);
  };
}