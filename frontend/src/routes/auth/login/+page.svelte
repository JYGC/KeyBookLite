<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "../$types";

  const { form }: { form: ActionData } = $props();

  let email = $state<string>(form?.email ?? "");
  let password = $state<string>(form?.password ?? "");
</script>

<h1>Log into account</h1>
<form
  method="post"
  use:enhance={() => {
    return async ({ update }) => {
      await update({ reset: false, invalidateAll: true });
    };
  }}
>
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
    <input
      type="submit"
      disabled={email.length === 0 || password.length < 8}
      value="Log in!"
    />
  </div>
</form>
<div>
  <p>Don't have an account?</p>
  <a href="/auth/create-account">Create an Account</a>
</div>