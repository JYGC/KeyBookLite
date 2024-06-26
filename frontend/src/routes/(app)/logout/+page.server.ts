import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
      throw redirect(303, "/auth");
    }

    try {
      locals.pb.authStore.clear();
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "log-out",
          message: error.message,
        };
      }

      return {
        error: "log-out",
        message: "An error occurred while logging out.",
      };
    }

    throw redirect(303, "/auth");
  },
};