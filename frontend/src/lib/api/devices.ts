import type { AddPropertyDeviceAndHistoriesDTO } from "$lib/dtos";
import { pb } from "$lib/api/pocketbase";

export const uploadCsvApiCall = async (pbAuthCookie: string, data: AddPropertyDeviceAndHistoriesDTO | null) => {
  if (data === null) {
    return;
  }
  pb.authStore.loadFromCookie(pbAuthCookie);
  await pb.send("/api/device/importcsv", {
    method: "POST",
    body: data,
  });
};