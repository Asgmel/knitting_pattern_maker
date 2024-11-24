<template>
  <div class="contentWrapper">
    <h1>Knitting Pattern Maker</h1>
    <HorizontalDivide />
    <FileInput button-text="Input File Path" @update:file-path="(filePath: string) => { inputFilePath = filePath }" />
    <FileInput input-type-folder button-text="Output Folder Path"
      @update:file-path="(filePath: string) => { outputFolderPath = filePath }" />
    <HorizontalDivide />
    <div class="horizontalFlex">
      <NumberInput label-text="Pattern Scale" v-model="patternScale" />
      <NumberInput label-text="Border Size" v-model="borderSize" />
      <NumberInput label-text="Icon Size" v-model="iconSize" />
    </div>
    <HorizontalDivide />
    <ColorReplacement v-for="(colorReplacement, index) in colorReplacements" v-model:from="colorReplacement.from"
      v-model:to="colorReplacement.to" @delete="() => { colorReplacements.splice(index, 1) }" />
    <button v-if="colorReplacements.length < 5" @click="addColorReplacement" class="addColorReplacement">Add
      line</button>
    <HorizontalDivide />
    <div class="horizontalFlex">
      <p>Print formats:</p>
      <OptionCheckbox label-text="Actual" v-model="printActual" />
      <OptionCheckbox label-text="A3" v-model="printA3" />
      <OptionCheckbox label-text="A4" v-model="printA4" />
      <OptionCheckbox label-text="A5" v-model="printA5" />
    </div>
    <HorizontalDivide />
    <button class="submitButton" :disabled="conversionInProgess" @click="submit">Submit</button>
    <p class="feedback">{{ conversionStatus }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRaw } from 'vue';
import ColorReplacement from './components/ColorReplacement.vue';
import FileInput from './components/FileInput.vue';
import NumberInput from './components/NumberInput.vue';
import OptionCheckbox from './components/OptionCheckbox.vue';
import HorizontalDivide from './components/HorizontalDivide.vue'
import { ConverterSettings } from './converter.types';

function addColorReplacement() {
  if (colorReplacements.value.length < 5) {
    colorReplacements.value.push({
      from: "#ffffff",
      to: "circle"
    })
  }
}

let inputFilePath = ref("/home/mel/Projects/knitting_pattern_maker/tmp/pixel.png")
let outputFolderPath = ref("/home/mel/Projects/knitting_pattern_maker/tmp")
let patternScale = ref(20)
let borderSize = ref(2)
let iconSize = ref(2)
let colorReplacements = ref([
  {
    from: "#fbf236",
    to: "circle",
  },
  {
    from: "#2a2a2a",
    to: "dot",
  },
  {
    from: "#000000",
    to: "#4f4f4f"
  }
])
let printA4 = ref(true)
let printA3 = ref(false)
let printA5 = ref(false)
let printActual = ref(true)

let conversionStatus = ref("")
let conversionInProgess = ref(false)

const submit = async () => {
  const settings: ConverterSettings = {
    inputFilePath: inputFilePath.value,
    outputFolderPath: outputFolderPath.value,
    patternScale: patternScale.value,
    borderSize: borderSize.value,
    iconSize: iconSize.value,
    colorReplacements: toRaw(colorReplacements.value),
    printActual: printActual.value,
    printA3: printA3.value,
    printA4: printA4.value,
    printA5: printA5.value,
  }
  conversionStatus.value = "Converting file..."
  conversionInProgess.value = true
  const result = await window.api.runConversion(settings);
  conversionInProgess.value = false
  conversionStatus.value = result
}
</script>

<style scoped>
h1 {
  margin: 0;
  color: var(--dark-font-color);
  font-size: 36px;
  text-align: center;
}

.contentWrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.horizontalFlex {
  display: flex;
  justify-content: space-between;
}

.addColorReplacement {
  width: 150px;
}

p {
  color: #ffffff;
  margin: 0;
}
</style>
