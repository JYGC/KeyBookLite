import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import {
  POCKETBASE_PRIVATE_EMAIL,
  POCKETBASE_PRIVATE_PASSWORD,
} from "$env/static/private";
import PocketBase from "pocketbase";
import { fail } from '@sveltejs/kit';

const createPocketBaseAdmin = async () => {
  try {
    const pbAdmin = new PocketBase(PUBLIC_POCKETBASE_URL);
    await pbAdmin.admins.authWithPassword(
      POCKETBASE_PRIVATE_EMAIL,
      POCKETBASE_PRIVATE_PASSWORD
    );
  
    return pbAdmin;
  } catch {
    throw fail(500);
  }
};

export const pbAdmin = await createPocketBaseAdmin();
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);