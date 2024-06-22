import type { AddPersonDTO, PersonNameDTO } from "$lib/dtos";
import type { IQueryParameters } from "./backend-services";
import type { IBackendServices, IPersonServices } from "./interfaces";

export class PersonServices implements IPersonServices {
  private readonly __backend: IBackendServices<IQueryParameters>;

  constructor(backend: IBackendServices<IQueryParameters>) {
    this.__backend = backend;
  }

  addPersonByNameIfNotExists = async (personNames: string[]) => {
    const existingPersonNameDTOs = await this.__backend.search<PersonNameDTO>('persons', {
      page: 1,
      perPage: 100,
      parameters: {
        filter: `${personNames.map(n => `name = "${n}"`).join(' || ')}`,
        fields: 'name'
      }
    });
    const existingPersonNames = existingPersonNameDTOs.map(n => n.name);
    const newPersons = personNames.filter(n => !existingPersonNames.includes(n));
    for (let i = 0; i < newPersons.length; i++) {
      let _ = { id: '' };
      await this.__backend.create<AddPersonDTO>('persons', {
        name: newPersons[i],
        type: "Tenant",
      }, _);
    }
  };
};