<template>
  <div class="container">
    <input type="text" :value="fromInputValue" @beforeinput="(e: Event) => { fromInputValue = sanitizeHexInput(e) }">
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(fromInputValue) }"></div>
    <div class="dash">-</div>
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(toInputValue) }"></div>
    <input type="text" :value="toInputValue" @beforeinput="(e: Event) => { toInputValue = sanitizeHexInput(e) }">
    <button class="change">⇓</button>

  </div>
</template>

<script setup lang="ts">


const fromInputValue = defineModel("from")
const toInputValue = defineModel("to")

function validateHexColor(hexColorValue: string) {
  if (/^#[a-fA-F0-9]{6}$/.test(hexColorValue)) {
    return hexColorValue;
  }

  return "#FFFFFF";
}

const sanitizeHexInput = (event: InputEvent) => {
  let value = (event.target as HTMLInputElement).value;
  let input = event.data;

  if (value.length > 6 && event.inputType === "insertText") {
    event.preventDefault()
  }

  if (value === "#" && event.inputType === "deleteContentBackward") {
    event.preventDefault()
  }

  if (!/^[a-fA-F0-9]$/.test(input) && event.inputType === "insertText") {
    event.preventDefault();
  }

  if (event.inputType == "insertFromPaste") {
    event.preventDefault()
    if (input.startsWith('#')) {
      value = input.slice(0, Math.min(input.length, 7))
    } else {
      value = input.slice(0, Math.min(input.length, 6))
    }
  }

  if (!value.startsWith('#')) {
    value = `#${value}`;
  }

  value = value.replace(/[^#a-fA-F0-9]/g, '');

  return value
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.colorBox {
  width: 20px;
  height: 20px;
}
</style>
