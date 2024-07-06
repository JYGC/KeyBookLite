import { pb } from "$lib/api/pocketbase";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const ssr = false;

export const load: LayoutLoad = async () => {
  pb.authStore.loadFromCookie(document.cookie);
  if (!pb.authStore.isValid) {
    return redirect(303, "/auth");
  }
  await pb.collection('users').authRefresh();
  pb.authStore.onChange((token, model) => {
    console.log('New store data:', token, model);
  });
};