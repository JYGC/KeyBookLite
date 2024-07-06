import { pb } from "./pocketbase";

export class LoginApi {
  public email = $state<string>("");
  public password = $state<string>("");

  public callApi = async (): Promise<string> => {
    await pb.collection("users").authWithPassword(this.email, this.password);
    return pb.authStore.exportToCookie({ httpOnly: false });
  };
}