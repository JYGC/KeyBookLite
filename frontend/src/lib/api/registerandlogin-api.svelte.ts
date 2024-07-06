import { pb } from "./pocketbase";

export class RegisterAndLoginApi {
  public name = $state<string>("");
  public email = $state<string>("");
  public password = $state<string>("");

  private __error = $state<string>("");

  public callApi = async (): Promise<string> => {
    try {
      await pb.collection("users").create({
        name: this.name,
        password: this.password,
        passwordConfirm: this.password,
        email: this.email,
        emailVisibility: false,
      });

      await pb
        .collection("users")
        .authWithPassword(this.email, this.password);

      return pb.authStore.exportToCookie({ httpOnly: false });
    } catch (ex: any) {
      this.__error = JSON.stringify(ex);
      return "";
    }
  };

  public get error() {
    return this.__error;
  }
}