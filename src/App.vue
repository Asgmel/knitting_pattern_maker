<template>
  <FileInput button-text="Input File Path" @update:file-path="(filePath: string) => { inputFilePath = filePath }" />
  <FileInput input-type-folder button-text="Output Folder Path"
    @update:file-path="(filePath: string) => { outputFolderPath = filePath }" />
  <button @click="submit">Submit</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FileInput from './components/FileInput.vue';

let inputFilePath = ref("")
let outputFolderPath = ref("")

const submit = () => {
  console.log(inputFilePath.value)
  console.log(outputFolderPath.value)
}
</script>
