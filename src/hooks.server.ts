import "reflect-metadata"
import { BackendServices } from '$lib/server/services/backend-services';
import { DataImportServices } from '$lib/server/services/data-import-services';
import { PersonDeviceServices } from '$lib/server/services/person-device-services';
import { PersonServices } from '$lib/server/services/person-services';
import { PropertyServices } from '$lib/server/services/property-services';
import type { Handle } from '@sveltejs/kit';
import { container } from 'tsyringe';
import { DeviceServices } from "$lib/server/services/device-services";

export const handle: Handle = async ({ event, resolve }) => {
  container.register("IBackendServices", { useClass: BackendServices });
  container.register("IPropertyServices", { useClass: PropertyServices });
  container.register("IPersonServices", { useClass: PersonServices });
  container.register("IDeviceServices", { useClass: DeviceServices });
  container.register("IPersonDeviceServices", { useClass: PersonDeviceServices });
  container.register("IDataImportServices", { useClass: DataImportServices });

  const backendService = container.resolve(BackendServices);
  const propertyService = container.resolve(PropertyServices);
  const personServices = container.resolve(PersonServices);
  const deviceServices = container.resolve(DeviceServices);
  const personDeviceServices = container.resolve(PersonDeviceServices);
  const dataImportServices = container.resolve(DataImportServices);

  event.locals.backendServices = backendService;
  event.locals.propertyServices = propertyService;
  event.locals.personServices = personServices;
  event.locals.deviceServices = deviceServices;
  event.locals.personDeviceServices = personDeviceServices;
  event.locals.dataImportServices = dataImportServices;
  const response = await resolve(event);

  return response;
};