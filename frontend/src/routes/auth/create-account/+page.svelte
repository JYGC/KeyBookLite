<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "../$types";

  const { form }: { form: ActionData } = $props();

  let name = $state<string>(form?.name ?? "");
  let email = $state<string>(form?.email ?? "");
  let password = $state<string>(form?.password ?? "");

  let error = $derived<string>(form?.message);
</script>

<h1>Create an Account</h1>
<form
  method="post"
  use:enhance={() => {
    return async ({ update }) => {
      await update({ reset: false, invalidateAll: true });
    };
  }}
>
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
    <input
      type="submit"
      disabled={name.length === 0 || email.length === 0 || password.length < 8}
      value="Create account!"
    />
  </div>
</form>
<div>
  <p>Already have an account?</p>
  <a href="/auth/login">Login</a>
</div>