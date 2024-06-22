import { fail, type Action } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());

    if (!(formData.fileToUpload as File).name ||
        (formData.fileToUpload as File).name === 'undefined'
    ) {
      return fail(400, {
        error: true,
        message: 'No file provided'
      });
    }

    const { fileToUpload } = formData as { fileToUpload: File }

    locals.dataImportServices.importCsv(await fileToUpload.text());
  }
} satisfies Action;