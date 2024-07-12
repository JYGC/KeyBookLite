import type { BackendClient } from "$lib/modules/backendclient.svelte";

export class LoginApi {
  private readonly __backendClient: BackendClient;
  
  public email = $state<string>("");
  public password = $state<string>("");

  constructor(backendClient: BackendClient) {
    this.__backendClient = backendClient;
  }

  public callApi = async (): Promise<string> => {
    await this.__backendClient.pb.collection("users").authWithPassword(this.email, this.password);
    return this.__backendClient.pb.authStore.exportToCookie({ httpOnly: false });
  };
}