import { inject, injectable } from "tsyringe";
import type { IBackendServices, IPropertyServices } from "./interfaces";

@injectable()
export class PropertyServices implements IPropertyServices {
  constructor(
    @inject("IBackendServices") private __backendServices: IBackendServices
  ) { }
  
  addPropertyIfNotExistsIgnoreHistory = async (propertyAddress: string, newIdOut: {id:string}) => {
    const existingProperties = await this.__backendServices.search<{id: string}>('properties', {
      page: 1,
      perPage: 100,
      parameters: {
        filter: `address = "${propertyAddress}"`,
        fields: 'id',
        expand: null
      }
    });

    if (existingProperties.length === 0) {
      await this.__backendServices.create('properties', {
        address: propertyAddress
      }, newIdOut);
    } else {
      newIdOut.id = existingProperties[0].id;
    }
  };
}