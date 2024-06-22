import type { PageServerLoad } from "./devices/csvimport/$types";

export const load: PageServerLoad = async ({ locals }) => {
  const resultList = await locals.backendServer.collection('devices').getFullList({
    sort: '-created',
  });
  return {
    resultList
  };
};