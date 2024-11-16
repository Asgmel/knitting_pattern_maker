<template>
  <div class="container">
    <button @click="updateFilePath">{{ buttonText }}</button>
    <div class="filePath">{{ filePath }}</div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

let filePath = ref("")

const emit = defineEmits(["update:filePath"])

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  inputTypeFolder: {
    type: Boolean,
    default: false
  }
})

const updateFilePath = async () => {
  let path = ""

  if (props.inputTypeFolder) {
    path = await window.api.openDirectory();
  } else {
    path = await window.api.openFile();
  }

  if (path) {
    filePath.value = path
    emit("update:filePath", path)
  }
}

</script>

<style scoped>
.container {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filePath {
  color: #ffffff;
}

button {
  width: 150px;
  height: 32px;
  background-color: #F28C28;
  color: #000000;
  border: none;
  border-radius: 3px;
}
</style>
