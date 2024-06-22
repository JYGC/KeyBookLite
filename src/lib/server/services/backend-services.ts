import PocketBase, { type RecordListOptions, type RecordModel } from "pocketbase";
import type { IBackendServices } from "./interfaces";

export interface IQueryParameters extends Object {
  page: number;
  perPage: number;
  parameters: RecordListOptions;
}

export class BackendServices implements IBackendServices<IQueryParameters> {
  private readonly __pocketbase: PocketBase;
  
  constructor(pocketbase: PocketBase) {
    this.__pocketbase = pocketbase;
  }

  create = async <T extends {}>(
      collectionName: string, 
      data: T,
      newIdOut: { id: string }
  ) => {
    const newRecord = await this.__pocketbase.collection(collectionName).create(data);
    if (newIdOut !== null){
      newIdOut.id = newRecord.id;
    }
  };

  search = async <T extends {}>(collectionName: string, searchCriteria: IQueryParameters) => {
    const results = await this.__pocketbase.collection(collectionName).getList<T>(
      searchCriteria.page, searchCriteria.perPage, searchCriteria.parameters);
    return results.items;
  };

  view = <T>(collectionName: string, recordID: string) => ({} as T);
  update = async <T>(collectionName: string, data: T) => {};
  delete = async <T>(collectionName: string, data: T) => {};

} 