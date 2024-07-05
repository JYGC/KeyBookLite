<script lang="ts">
	import { pb } from "$lib/api/pocketbase";

  let email = $state<string>("");
  let password = $state<string>("");

  const login = async () => {
    await pb.collection("users").authWithPassword(email, password);
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    window.location.replace("");
  };
</script>

<h1>Log into account</h1>

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
<div>
  <button
    disabled={email.length === 0 || password.length < 8}
    onclick={login}
  >Log in!</button>
</div>

<div>
  <p>Don't have an account?</p>
  <a href="/auth/create-account">Create an Account</a>
</div>