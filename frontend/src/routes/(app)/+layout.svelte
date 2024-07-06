<script lang="ts">
	import { pb } from '$lib/api/pocketbase';

  const { children } = $props();

  const logoutAndRedirect = async () => {
    pb.authStore.loadFromCookie(document.cookie);
    await pb.collection('users').authRefresh();
    pb.authStore.clear();
    // set past expiry to all cookies
    var Cookies = document.cookie.split(';');
    for (let i = 0; i < Cookies.length; i++) {
      document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
    }
    if (!pb.authStore.isValid) {
      window.location.replace("/auth");
    }
  }
</script>
<button onclick={logoutAndRedirect}>Logout</button>

{@render children()}