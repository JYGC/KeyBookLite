import type { IQueryParameters } from "./backend-services";
import type { IBackendServices, IPropertyServices } from "./interfaces";

export class PropertyServices implements IPropertyServices {
  private readonly __backendServices: IBackendServices<IQueryParameters>;

  constructor(backendServices: IBackendServices<IQueryParameters>) {
    this.__backendServices = backendServices;
  }
  
  addPropertyIfNotExists = async (propertyAddress: string, newIdOut: {id:string}) => {
    const existingProperties = await this.__backendServices.search<string>('properties', {
      page: 1,
      perPage: 100,
      parameters: {
        filter: `address = "${propertyAddress}"`,
        fields: 'id'
      }
    });

    if (existingProperties.length === 0) {
      await this.__backendServices.create('properties', {
        address: propertyAddress
      }, newIdOut);
    }
  };
}