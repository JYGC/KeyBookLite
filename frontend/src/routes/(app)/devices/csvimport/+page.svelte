<script lang="ts">
	import { CsvFileToObjectConverter } from "$lib/modules/csvfiletoobjectconverter.svelte";
	import { UploadCsvApi } from "$lib/api/uploadcsvapi";

  const acceptedExtensions = ['.csv']
  
  const csvFileToObjectConverter = new CsvFileToObjectConverter();
  const uploadCsvApi = new UploadCsvApi(csvFileToObjectConverter, document.cookie);

  const uploadFile = () => {
    uploadCsvApi.callApi();
    csvFileToObjectConverter.input = null;
  };

  let disableUploadButtonAsync = $derived.by(async () => await csvFileToObjectConverter.outputAsync === null);
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
{#await disableUploadButtonAsync then value} 
  <button
    disabled={value}
    onclick={uploadFile}
  >Upload</button>
{/await}
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