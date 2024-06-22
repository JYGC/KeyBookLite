import type { AddDeviceAndHistoriesDTO } from "$lib/dtos";
import type {
  IPropertyServices,
  IDataImportServices,
  IPersonServices,
  IPersonDeviceServices
} from "./interfaces";

export class DataImportServices implements IDataImportServices {
  private readonly __personServices: IPersonServices;
  private readonly __deviceServices: IPersonDeviceServices;
  private readonly __propertyServices: IPropertyServices;

  constructor(
      personServices: IPersonServices,
      deviceServices: IPersonDeviceServices,
      propertyServices: IPropertyServices
  ) {
    this.__personServices = personServices;
    this.__deviceServices = deviceServices;
    this.__propertyServices = propertyServices;
  }

  importCsv = async (csvText: string) => {
    const lines = csvText.split('\n');
  
    const nonEmptyLines: string[] = [];
  
    const regex = /[a-zA-Z0-9]/;
    lines.forEach((line) => {
      if (regex.test(line)) {
        nonEmptyLines.push(line.trim());
      }
    });
  
    const propertyLineSplit = nonEmptyLines[0].split('"');
  
    const propertyAddress = propertyLineSplit[1];
  
    const subHeadingSplit = nonEmptyLines[1].split(',');
  
    const devices = [];
    for (let c = 2; c < nonEmptyLines.length; c++) {
      const deviceLineSplit = nonEmptyLines[c].split(',');
  
      let deviceProcurementDate: Date | null = null;
      let deviceDefunctDate: Date | null = null;
  
      const device: AddDeviceAndHistoriesDTO = {
        name: deviceLineSplit[0],
        identifier: deviceLineSplit[1],
        type: deviceLineSplit[2],
        defunctReason: 'None',
        currentHolder: null,
        deviceHistories: [],
        personDeviceHistories: []
      };
  
      let lastNonEmptyRow = -1;
      for (let r = 3; r < deviceLineSplit.length; r++) {
        const deviceHolder = deviceLineSplit[r].trim();
        if (deviceHolder.length > 0) {
          lastNonEmptyRow = r;
          if (deviceProcurementDate === null) {
            deviceProcurementDate = new Date(subHeadingSplit[r]);
            device.deviceHistories.push({
              dateSpecified: deviceProcurementDate,
              actionDescription: 'procured'
            });
          }
          if (deviceHolder === '!!LOST!!') {
            device.personDeviceHistories.push({
              deviceHolder: null,
              dateSpecified: new Date(subHeadingSplit[r]),
              actionDescription: 'device lost'
            });
          } else if (deviceHolder === '!!STOLEN BY TENANT!!') {
            device.personDeviceHistories.push({
              deviceHolder: null,
              dateSpecified: new Date(subHeadingSplit[r]),
              actionDescription: 'device stolen'
            });
          } else if (deviceHolder === '!!NOT WORKING!!') {
            device.personDeviceHistories.push({
              deviceHolder: null,
              dateSpecified: new Date(subHeadingSplit[r]),
              actionDescription: 'device damaged'
            });
          } else if (deviceHolder !== 'Storage') {
            device.personDeviceHistories.push({
              deviceHolder,
              dateSpecified: new Date(subHeadingSplit[r]),
              actionDescription: 'device held by'
            });
          }
        }
      }
  
      if (lastNonEmptyRow < deviceLineSplit.length - 1) {
        const lastDeviceHistory: {
          dateSpecified: Date,
          actionDescription: string | null
        } = {
          dateSpecified:  new Date(subHeadingSplit[lastNonEmptyRow]),
          actionDescription: null
        };
  
        const lastDeviceHolder = deviceLineSplit[lastNonEmptyRow].trim();
        if (lastDeviceHolder === '!!LOST!!') {
          device.defunctReason = 'Lost';
          lastDeviceHistory.actionDescription = 'device lost';
        } else if (lastDeviceHolder === '!!STOLEN BY TENANT!!') {
          device.defunctReason = 'Stolen';
          lastDeviceHistory.actionDescription = 'device stolen';
        } else if (lastDeviceHolder === '!!NOT WORKING!!') {
          device.defunctReason = 'Damaged';
          lastDeviceHistory.actionDescription = 'device damaged';
        } else {
          device.defunctReason = 'Retired';
          lastDeviceHistory.actionDescription = 'device retired';
        }
  
        device.deviceHistories.push(lastDeviceHistory);
      }
  
      const currentHolderRegistered = deviceLineSplit[deviceLineSplit.length - 1];
  
      device.currentHolder = currentHolderRegistered.length === 0 || currentHolderRegistered === 'Storage' || currentHolderRegistered === '!!LOST!!' ? null : currentHolderRegistered;
  
      devices.push(device);
    }
  
    const persons: string[] = [];
    devices.forEach(d => {
      d.personDeviceHistories.forEach(pdh => {
        if (pdh.deviceHolder !== null && !persons.find(p => p === pdh.deviceHolder)) {
          persons.push(pdh.deviceHolder);
        }
      });
    });

    let propertyId = {id:''};
    await this.__propertyServices.addPropertyIfNotExists(propertyAddress, propertyId);
    await this.__personServices.addPersonByNameIfNotExists(persons);
    await this.__deviceServices.addDevicesByIdentificationAndNameIfNotExists(devices, propertyId);
  }
}