<template>
  <div class="contentWrapper">
    <FileInput button-text="Input File Path" @update:file-path="(filePath: string) => { inputFilePath = filePath }" />
    <FileInput input-type-folder button-text="Output Folder Path"
      @update:file-path="(filePath: string) => { outputFolderPath = filePath }" />
    <div class="horizontalFlex">
      <NumberInput label-text="Pattern Scale" v-model="patternScale" />
      <NumberInput label-text="Border Size" v-model="borderSize" />
    </div>
    <ColorReplacement v-model:from="fromInput1" v-model:to="toInput2" />
    <ColorReplacement v-model:from="fromInput2" v-model:to="toInput2" />
    <ColorReplacement v-model:from="fromInput3" v-model:to="toInput3" />
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
let fromInput1 = ref("#ffffff")
let toInput1 = ref("#ffffff")
let fromInput2 = ref("#ffffff")
let toInput2 = ref("#ffffff")
let fromInput3 = ref("#ffffff")
let toInput3 = ref("#ffffff")

const submit = () => {
  console.log(inputFilePath.value)
  console.log(outputFolderPath.value)
  console.log(patternScale.value)
  console.log(borderSize.value)
  console.log(fromInput1.value)
  console.log(toInput1.value)
  console.log(fromInput2.value)
  console.log(toInput2.value)
  console.log(fromInput3.value)
  console.log(toInput3.value)
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
