<script lang="ts">
	import { enhance } from "$app/forms";

  const { children } = $props();
</script>
<form action="/logout" method="post" use:enhance>
  <input type="submit" value="Logout" />
</form>

{@render children()}