import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    return {
      authenticated: true,
      authModel: locals.pb.authStore.model,
    }
  }

  throw redirect(303, "/auth");
}) satisfies LayoutServerLoad;