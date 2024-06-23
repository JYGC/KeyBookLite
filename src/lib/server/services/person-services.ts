import type { AddPersonDTO, PersonNameDTO } from "$lib/dtos";
import { inject, injectable } from "tsyringe";
import type { IBackendServices, IPersonServices } from "./interfaces";

@injectable()
export class PersonServices implements IPersonServices {

  constructor(
    @inject("IBackendServices") private __backend: IBackendServices
  ) { }

  addPersonByNameIfNotExistsIgnoreHistory = async (personNames: string[]) => {
    const existingPersonNameDTOs = await this.__backend.search<PersonNameDTO>('persons', {
      page: 1,
      perPage: 100,
      parameters: {
        filter: `${personNames.map(n => `name = "${n}"`).join(' || ')}`,
        fields: 'name',
        expand: null
      }
    });
    const existingPersonNames = existingPersonNameDTOs.map(n => n.name);
    const newPersons = personNames.filter(n => !existingPersonNames.includes(n));
    for (let i = 0; i < newPersons.length; i++) {
      const _ = { id: '' };
      await this.__backend.create<AddPersonDTO>('persons', {
        name: newPersons[i],
        type: "Tenant",
      }, _);
    }
  };
};