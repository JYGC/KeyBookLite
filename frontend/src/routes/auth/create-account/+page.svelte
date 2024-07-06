<script lang="ts">
	import { pb } from "$lib/api/pocketbase";

  let name = $state<string>("");
  let email = $state<string>("");
  let password = $state<string>("");

  let error = $state<string>("");

  const createAccountAndLogin = async () => {
    try {
      await pb.collection("users").create({
        name,
        password,
        passwordConfirm: password,
        email,
        emailVisibility: false,
      });

      await pb
        .collection("users")
        .authWithPassword(email, password);

      document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
      window.location.replace("");
    } catch (ex: any) {
      error = JSON.stringify(ex);
    }
  };
</script>

<h1>Create an Account</h1>
<div>
  <label for="name">Name</label>
  <input
    type="text"
    name="name"
    bind:value={name}
  />
</div>
<div>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    bind:value={email}
  />
</div>
<div>
  <label for="password">Password</label>
  <input
    type="password"
    name="password"
    bind:value={password}
  />
</div>

{#if error}
  <p class="error">{error}</p>
{/if}

<div>
  <button
    disabled={name.length === 0 || email.length === 0 || password.length < 8}
    onclick={createAccountAndLogin}
  >Create account!</button>
</div>


<div>
  <p>Already have an account?</p>
  <a href="/auth/login">Login</a>
</div>