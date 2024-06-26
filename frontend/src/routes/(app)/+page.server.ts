import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
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
}) satisfies PageServerLoad;