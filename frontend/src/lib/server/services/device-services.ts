import { inject, injectable } from "tsyringe";
import type { IBackendServices, IDeviceServices } from "./interfaces";
import type { AddDeviceAndHistoriesDTO, DeviceIdNameIdentifierAndTypeDTO } from "$lib/dtos";

@injectable()
export class DeviceServices implements IDeviceServices {
  constructor(
    @inject("IBackendServices") private __backendService: IBackendServices
  ) { }

  getDevicesByNamesAndIdentifiers = async (
    devicesNameIdentifierAndType: DeviceIdNameIdentifierAndTypeDTO[],
    propertyId: string
  ) => {
    return await this.__backendService.search<DeviceIdNameIdentifierAndTypeDTO>('devices', {
      page: 0,
      perPage: 100,
      parameters: {
        expand: null,
        fields: 'id,name,identifier,type',
        filter: `(${devicesNameIdentifierAndType.map(
          d => `(name = "${d.name}" && identifier = "${d.identifier}" && type = "${d.type}")`).join(' || ')})` +
          ` && property = "${propertyId}"`
      }
    });
  };

  addDevicesIfNotExistsIgnoreHistory = async (
    devicesAndHistories: AddDeviceAndHistoriesDTO[],
    propertyId: string,
    newDeviceIdsOut: { id:string }[]
  ) => {
    const devicesNameIdentifierAndType: DeviceIdNameIdentifierAndTypeDTO[] = devicesAndHistories.map(d => ({
      name: d.name,
      identifier: d.identifier,
      type: d.type
    }))
    const existingDevices = await this.getDevicesByNamesAndIdentifiers(devicesNameIdentifierAndType, propertyId);
    const existingDeviceNameTypeJoins = existingDevices.map(d => `${d.name}${d.identifier}${d.type}`);

    const newDevicesAndHistories = devicesAndHistories.filter(
      dh => !existingDeviceNameTypeJoins.includes(`${dh.name}${dh.identifier}${dh.type}`));

    for (let i = 0; i < newDevicesAndHistories.length; i++) {
      const newDeviceId = {id: ''}; 
      await this.__backendService.create('devices', {
        name: newDevicesAndHistories[i].name,
        identifier: newDevicesAndHistories[i].identifier,
        defunctreason: newDevicesAndHistories[i].defunctReason,
        type: newDevicesAndHistories[i].type,
        property: propertyId
      }, newDeviceId);
      newDeviceIdsOut.push(newDeviceId);
    }

    console.table(newDeviceIdsOut);
  };
}