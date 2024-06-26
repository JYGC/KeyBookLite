import { container } from "tsyringe";
import { BackendServices } from "./services/backend-services";
import { PropertyServices } from "./services/property-services";
import { PersonServices } from "./services/person-services";
import { DeviceServices } from "./services/device-services";
import { PersonDeviceServices } from "./services/person-device-services";
import { DataImportServices } from "./services/data-import-services";
import type { RequestEvent } from "@sveltejs/kit";

export const createDependencyInjectionContainer= (event: RequestEvent) => {
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
};