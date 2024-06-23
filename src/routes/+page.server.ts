import type { PageServerLoad } from "./devices/csvimport/$types";

export const load: PageServerLoad = async ({ locals }) => {
  const resultList = await locals.backendServices.search('devices', { 
    page: 1,
    perPage: 100,
    parameters: {
      expand: null,
      fields: null,
      filter: null
    }
  });
  return {
    resultList
  };
};