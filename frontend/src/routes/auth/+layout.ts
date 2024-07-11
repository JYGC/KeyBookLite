import { pb } from "$lib/api/pocketbase";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const ssr = false;
export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = async () => {
  pb.authStore.loadFromCookie(document.cookie);
  if (pb.authStore.isValid) {
    return redirect(303, "/");
  }
};
