<script lang="ts">
	import { enhance } from "$app/forms";

  const acceptedExtensions = ['.csv']
</script>

<form
  method="post"
  use:enhance
  enctype="multipart/form-data"
>
  <div class="group">
    <input
      type="file"
      name="fileToUpload"
      id="file"
      accept={acceptedExtensions.join(',')}
      required
    />
  </div>
  <input type="submit" value="Upload" />
</form>