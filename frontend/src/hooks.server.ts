import "reflect-metadata"
import type { Handle } from '@sveltejs/kit';
import { createDependencyInjectionContainer } from "$lib/server/dependency-injection";
import { pb, pbAdmin } from "$lib/server/pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = pb;

  pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');
  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh();
    }
  } catch {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  event.locals.pbAdmin = pbAdmin;
  
  createDependencyInjectionContainer(event);

  const response = await resolve(event);
  
  response.headers.set(
    'set-cookie',
    pb.authStore.exportToCookie({
      sameSite: true,
      secure: false,
      httpOnly: false,
    })
  );

  return response;
};