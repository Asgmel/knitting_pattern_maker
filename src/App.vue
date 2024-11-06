<template>
  <FileInput button-text="Input File Path" @update:file-path="(filePath: string) => { inputFilePath = filePath }" />
  <FileInput input-type-folder button-text="Output Folder Path"
    @update:file-path="(filePath: string) => { outputFolderPath = filePath }" />
  <NumberInput label-text="Pattern Scale" v-model="patternScale" />
  <NumberInput label-text="Border Size" v-model="borderSize" />
  <button @click="submit">Submit</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FileInput from './components/FileInput.vue';
import NumberInput from './components/NumberInput.vue';

let inputFilePath = ref("")
let outputFolderPath = ref("")
let patternScale = ref(20)
let borderSize = ref(2)

const submit = () => {
  console.log(inputFilePath.value)
  console.log(outputFolderPath.value)
  console.log(patternScale.value)
  console.log(borderSize.value)
}
</script>
