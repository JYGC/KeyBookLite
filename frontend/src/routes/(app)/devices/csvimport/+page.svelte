<script lang="ts">
	import { CsvFileToObjectConverter } from "$lib/modules/csvfiletoobject-converter.svelte";
	import { uploadCsvApiCall } from "$lib/api/devices";

  const acceptedExtensions = ['.csv']
  const csvFileToObjectConverter = new CsvFileToObjectConverter();

  const uploadCsvAsync = async () => {
    uploadCsvApiCall(document.cookie, await csvFileToObjectConverter.outputAsync);
  };
</script>

<div class="group">
  <input
    type="file"
    name="fileToUpload"
    id="file"
    accept={acceptedExtensions.join(',')}
    bind:files={csvFileToObjectConverter.input}
    required
  />
</div>
<p>
  {#await csvFileToObjectConverter.outputAsync}
    ...awaiting
  {:then output}
    {#if output !== null}
      {JSON.stringify(output)}
    {/if}
  {:catch error}
    {error}
  {/await}
</p>
<button onclick={uploadCsvAsync}>Upload</button>