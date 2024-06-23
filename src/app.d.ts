import type { IBackendServices, IDataImportServices, IDeviceServices, IPersonDeviceServices, IPersonServices, IPropertyServices } from '$lib/server/services/interfaces';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			backendServices: IBackendServices;
			propertyServices: IPropertyServices;
			personServices: IPersonServices;
			deviceServices: IDeviceServices;
			personDeviceServices: IPersonDeviceServices;
			dataImportServices: IDataImportServices;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
