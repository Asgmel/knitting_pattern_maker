<template>
  <div class="container">
    <label for="numberInput">{{ labelText }}</label>
    <input id="numberInput" v-model="inputValueModel" type="number">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  labelText: {
    type: String,
    required: true,
  },
})

const inputValueModel = defineModel()

console.log(inputValueModel.value)
</script>

<style scoped></style>
