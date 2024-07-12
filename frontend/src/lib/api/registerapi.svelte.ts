import { pb } from "./pocketbase";

export class RegisterApi {
  public name = $state<string>("");
  public email = $state<string>("");
  public password = $state<string>("");

  private __error = $state<string>("");

  public callApi = async (): Promise<boolean> => {
    try {
      await pb.collection("users").create({
        name: this.name,
        password: this.password,
        passwordConfirm: this.password,
        email: this.email,
        emailVisibility: false,
      });
      return true;
    } catch (ex) {
      this.__error = JSON.stringify(ex);
      return false;
    }
  };

  public get error() {
    return this.__error;
  }
}