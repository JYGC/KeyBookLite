import type { BackendClient } from "$lib/api/backendclient.svelte";

export class RegisterApi {
  private readonly __backendClient: BackendClient;
  
  public name = $state<string>("");
  public email = $state<string>("");
  public password = $state<string>("");

  constructor(backendClient: BackendClient) {
    this.__backendClient = backendClient;
  }

  private __error = $state<string>("");

  public callApi = async (): Promise<boolean> => {
    try {
      await this.__backendClient.pb.collection("users").create({
        name: this.name,
        password: this.password,
        passwordConfirm: this.password,
        email: this.email,
        emailVisibility: false,
      });
      return true;
    } catch (ex) {
      console.log(ex);
      this.__error = JSON.stringify(ex);
      return false;
    }
  };

  public get error() {
    return this.__error;
  }
}