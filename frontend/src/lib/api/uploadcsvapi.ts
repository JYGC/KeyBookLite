import type { BackendClient } from "$lib/api/backendclient.svelte";
import type { CsvFileToObjectConverter } from "$lib/modules/csvfiletoobjectconverter.svelte";

export class UploadCsvApi {
  private readonly __csvFileToObjectConverter: CsvFileToObjectConverter;
  private readonly __authManager: BackendClient;
  
  constructor(
    csvFileToObjectConverter: CsvFileToObjectConverter,
    authManager: BackendClient
  ) {
    this.__csvFileToObjectConverter = csvFileToObjectConverter;
    this.__authManager = authManager;
  }

  callApi = async () => {
    const csvContentObject = await this.__csvFileToObjectConverter.outputAsync;
    if (csvContentObject === null) {
      return;
    }
    await this.__authManager.pb.send("/api/device/importcsv", {
      method: "POST",
      body: csvContentObject,
    });
  };
}