<template>
  <div class="container">
    <input type="text" ref="fromInput" :value="fromInputValue"
      @beforeinput="(e: Event) => { fromInputValue = sanitizeHexInput(fromInputRef, e) }"
      :style="{ border: validateHexColor(fromInputValue) ? '' : '2px solid #ff0033' }">
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(fromInputValue) ? fromInputValue : '#dad7cd' }">
    </div>
    <div class="dash">-</div>
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(toInputValue) ? toInputValue : '#dad7cd' }">
      {{ transformationElementsIcons[transformationElementIndex] }}</div>
    <input v-if="transformationElementsName[transformationElementIndex] == 'hex'" type="text" ref="toInput"
      :value="toInputValue" @beforeinput="(e: Event) => { toInputValue = sanitizeHexInput(toInputRef, e) }"
      :style="{ border: validateHexColor(toInputValue) ? '' : '1px solid #ff0033' }">
    <p v-if="transformationElementsName[transformationElementIndex] != 'hex'">
      {{ transformationElementsName[transformationElementIndex] }}</p>
    <button class="changeButton" @click="incrementTransformationElementIndex">➡</button>
    <button class="deleteButton" @click="$emit('delete')">✖</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, Ref, useTemplateRef } from 'vue';

defineEmits(["delete"])

const fromInputValue = defineModel<string>("from")
const toInputValue = defineModel<string>("to")
const fromInputRef: Ref<HTMLInputElement> = useTemplateRef("fromInput")
const toInputRef: Ref<HTMLInputElement> = useTemplateRef("toInput")

const transformationElementsName = ["circle", "dot", "cross", "line", "hex"]
const transformationElementsIcons = ["O", "•", "X", "-", ""]
let transformationElementIndex = ref(0)
let hexValueHolder = "#ffffff"

onBeforeMount(() => {
  const index = transformationElementsName.indexOf(toInputValue.value)
  transformationElementIndex.value = index === -1 ? transformationElementsName.indexOf('hex') : index
})

function incrementTransformationElementIndex() {
  if (transformationElementsName[transformationElementIndex.value] === "hex") {
    hexValueHolder = toInputValue.value
  }
  if (transformationElementIndex.value < transformationElementsName.length - 1) {
    transformationElementIndex.value++
  } else {
    transformationElementIndex.value = 0
  }

  if (transformationElementsName[transformationElementIndex.value] === "hex") {
    toInputValue.value = hexValueHolder
  } else {
    toInputValue.value = transformationElementsName[transformationElementIndex.value]
  }
}

function validateHexColor(hexColorValue: string) {
  return /^#[a-fA-F0-9]{6}$/.test(hexColorValue)
}

function sanitizeHexInput(element: HTMLInputElement, event: InputEvent) {
  event.preventDefault()

  let value = (event.target as HTMLInputElement).value;
  const input = event.data;
  // Do math.max to make sure we never delete the # at space 0
  const selectionStart = Math.max((event.target as HTMLInputElement).selectionStart, 1)
  const selectionEnd = Math.max((event.target as HTMLInputElement).selectionEnd, 1)
  const selectionActive = selectionStart !== selectionEnd
  let cursorPosition = selectionStart

  if (event.inputType === "insertText") {
    if ((value.length <= 6 || selectionActive) && /^[a-fA-F0-9]$/.test(input)) { // Only allow hex characters
      value = `#${value.slice(1, selectionStart) + input + value.slice(selectionEnd, value.length)}`
      cursorPosition++
    }
  }

  if (event.inputType === "deleteContentBackward") {
    if (!selectionActive) {
      value = `#${value.slice(1, Math.max(selectionStart - 1, 1)) + value.slice(selectionEnd, value.length)}`
    } else {
      value = `#${value.slice(1, selectionStart) + value.slice(selectionEnd, value.length)}`
    }
    if (cursorPosition != 1) {
      cursorPosition--
    }
  }

  if (event.inputType === "deleteContentForward") {
    if (!selectionActive) {
      value = `#${value.slice(1, selectionStart) + value.slice(Math.min(selectionEnd + 1, value.length - 1), value.length)}`
    } else {
      value = `#${value.slice(1, selectionStart) + value.slice(selectionEnd, value.length)}`
    }
  }

  if (event.inputType == "insertFromPaste") {
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

  setTimeout(() => {
    element.focus()
    element.setSelectionRange(cursorPosition, cursorPosition);
  })

  return value
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dash {
  color: #ffffff;
}

button {
  display: flex;
  width: 32px;
  font-size: 24px;
  transform: rotate(90deg);
  align-items: center;
  justify-content: center;
}

.changeButton {
  margin-left: 100px;
}

input {
  width: 80px;
}

p {
  width: 80px;
  margin: 0;
  padding: 0 7px;
  color: var(--light-font-color);
  text-transform: capitalize;
}

.colorBox {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-font-color);
}
</style>
