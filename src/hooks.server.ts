import { pb } from '$lib/server/data/pocketbase'
import { BackendServices } from '$lib/server/services/backend-services';
import { DataImportServices } from '$lib/server/services/data-import-services';
import { PersonDeviceServices } from '$lib/server/services/person-device-services';
import { PersonServices } from '$lib/server/services/person-services';
import { PropertyServices } from '$lib/server/services/property-services';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.backendServices = new BackendServices(pb);
  event.locals.propertyServices = new PropertyServices(event.locals.backendServices);
  event.locals.personServices = new PersonServices(event.locals.backendServices);
  event.locals.personDeviceServices = new PersonDeviceServices(
    event.locals.backendServices,
    event.locals.personServices
  );
  event.locals.dataImportServices = new DataImportServices(
    event.locals.personServices,
    event.locals.personDeviceServices,
    event.locals.propertyServices);
  const response = await resolve(event);

  return response;
};