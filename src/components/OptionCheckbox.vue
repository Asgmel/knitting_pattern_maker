<template>
  <div class="container">
    <label>
      {{ labelText }}
      <div class="customCheckbox" @keydown="handleCheckboxKeyPress" tabindex="0">{{ checkboxValueModel ? '✔' : '' }}
      </div>
      <input type="checkbox" v-model="checkboxValueModel">
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  labelText: {
    type: String,
    required: true
  },
})

const checkboxValueModel = defineModel()


function handleCheckboxKeyPress(e: KeyboardEvent) {
  if (e.key == " " || e.key == "Enter") {
    checkboxValueModel.value = !checkboxValueModel.value
  }
}
</script>

<style scoped>
input {
  display: none;
}

label {
  display: flex;
  gap: 10px;
  color: #ffffff;
}

.customCheckbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: var(--input-background-color);
  color: var(--dark-font-color);
  user-select: none;
  cursor: pointer;
}
</style>
