<template>
  <div class="container">
    <label for="numberInput">{{ labelText }}</label>
    <input id="numberInput" v-model="inputValueModel" type="number">
  </div>
</template>

<script setup lang="ts">
defineProps({
  labelText: {
    type: String,
    required: true,
  },
})

const inputValueModel = defineModel()

</script>

<style scoped>
.container {
  display: flex;
  gap: 14px;
  align-items: center;
}

label {
  color: #ffffff;
}

input {
  width: 50px;
}
</style>
