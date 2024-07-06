<script lang="ts">
	import { RegisterAndLoginApi } from "$lib/api/registerandlogin-api.svelte";

  const registerAndLoginApi = new RegisterAndLoginApi();

  const register = async () => {
    document.cookie = await registerAndLoginApi.callApi();
    window.location.replace("");

  };
</script>

<h1>Create an Account</h1>
<div>
  <label for="name">Name</label>
  <input
    type="text"
    name="name"
    bind:value={registerAndLoginApi.name}
  />
</div>
<div>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    bind:value={registerAndLoginApi.email}
  />
</div>
<div>
  <label for="password">Password</label>
  <input
    type="password"
    name="password"
    bind:value={registerAndLoginApi.password}
  />
</div>

{#if registerAndLoginApi.error}
  <p class="error">{registerAndLoginApi.error}</p>
{/if}

<div>
  <button
    disabled={
      registerAndLoginApi.name.length === 0 ||
      registerAndLoginApi.email.length === 0 ||
      registerAndLoginApi.password.length < 8
    }
    onclick={register}
  >Create account!</button>
</div>


<div>
  <p>Already have an account?</p>
  <a href="/auth/login">Login</a>
</div>