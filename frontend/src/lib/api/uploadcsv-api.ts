import { pb } from "$lib/api/pocketbase";
import type { CsvFileToObjectConverter } from "$lib/modules/csvfiletoobject-converter.svelte";

export class UploadCsvApi {
  private readonly __csvFileToObjectConverter: CsvFileToObjectConverter;
  private readonly __pbAuthCookie: string;
  
  constructor(
    csvFileToObjectConverter: CsvFileToObjectConverter,
    pbAuthCookie: string
  ) {
    this.__csvFileToObjectConverter = csvFileToObjectConverter;
    this.__pbAuthCookie = pbAuthCookie;
  }

  callApi = async () => {
    const csvContentObject = await this.__csvFileToObjectConverter.outputAsync;
    if (csvContentObject === null) {
      return;
    }
    pb.authStore.loadFromCookie(this.__pbAuthCookie);
    await pb.send("/api/device/importcsv", {
      method: "POST",
      body: csvContentObject,
    });
  };
}