<script lang="ts">
	import { CsvFileToObjectConverter } from "$lib/modules/csvfiletoobject-converter.svelte";
	import { UploadCsvApi } from "$lib/api/uploadcsv-api";

  const acceptedExtensions = ['.csv']
  
  const csvFileToObjectConverter = new CsvFileToObjectConverter();
  const uploadCsvApi = new UploadCsvApi(csvFileToObjectConverter, document.cookie);
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
<button onclick={uploadCsvApi.callApi}>Upload</button>