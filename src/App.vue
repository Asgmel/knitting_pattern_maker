<template>
  <div class="contentWrapper">
    <FileInput button-text="Input File Path" @update:file-path="(filePath: string) => { inputFilePath = filePath }" />
    <FileInput input-type-folder button-text="Output Folder Path"
      @update:file-path="(filePath: string) => { outputFolderPath = filePath }" />
    <div class="horizontalFlex">
      <NumberInput label-text="Pattern Scale" v-model="patternScale" />
      <NumberInput label-text="Border Size" v-model="borderSize" />
    </div>
    <ColorReplacement v-model:from="fromInput" v-model:to="toInput" />
    <ColorReplacement />
    <ColorReplacement />
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorReplacement from './components/ColorReplacement.vue';
import FileInput from './components/FileInput.vue';
import NumberInput from './components/NumberInput.vue';

let inputFilePath = ref("")
let outputFolderPath = ref("")
let patternScale = ref(20)
let borderSize = ref(2)
let fromInput = ref("abcabc")
let toInput = ref("#121212")

const submit = () => {
  console.log(inputFilePath.value)
  console.log(outputFolderPath.value)
  console.log(patternScale.value)
  console.log(borderSize.value)
  console.log(fromInput.value)
  console.log(toInput.value)
}
</script>

<style scoped>
.contentWrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.horizontalFlex {
  display: flex;
  gap: 40px;
}
</style>
