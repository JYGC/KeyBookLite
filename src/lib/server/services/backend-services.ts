import PocketBase, { type RecordListOptions } from "pocketbase";
import type { IBackendServices } from "./interfaces";
import { injectable } from "tsyringe";
import type { IQueryParameters } from "$lib/dtos";
import { pb } from "../pocketbase";

@injectable()
export class BackendServices implements IBackendServices {
  private readonly __pocketbase: PocketBase;
  
  constructor() {
    this.__pocketbase = pb;
  }

  create = async <T extends object>(
      collectionName: string, 
      data: T,
      newIdOut: { id: string }
  ) => {
    const newRecord = await this.__pocketbase.collection(collectionName).create(data);
    if (newIdOut !== null){
      newIdOut.id = newRecord.id;
    }
  };

  search = async <T extends object>(collectionName: string, searchCriteria: IQueryParameters) => {
    const recordListOptions: RecordListOptions = {};
    if (searchCriteria.parameters.expand !== null && searchCriteria.parameters.expand.trim().length > 0) {
      recordListOptions.expand = searchCriteria.parameters.expand;
    }
    if (searchCriteria.parameters.fields !== null && searchCriteria.parameters.fields.trim().length > 0) {
      recordListOptions.fields = searchCriteria.parameters.fields;
    }
    if (searchCriteria.parameters.filter !== null && searchCriteria.parameters.filter.trim().length > 0) {
      recordListOptions.filter = searchCriteria.parameters.filter;
    }

    const results = await this.__pocketbase.collection(collectionName).getList<T>(
      searchCriteria.page, searchCriteria.perPage, recordListOptions);
    return results.items;
  };

  view = <T>(collectionName: string, recordID: string) => ({} as T);
  update = async <T>(collectionName: string, data: T) => {};
  delete = async <T>(collectionName: string, data: T) => {};

} 