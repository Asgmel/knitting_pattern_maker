<template>
  <div class="container">
    <input type="text" ref="fromInput" :value="fromInputValue"
      @beforeinput="(e: Event) => { fromInputValue = sanitizeHexInput(e) }"
      :style="{ border: validateHexColor(fromInputValue) ? 'none' : '1px solid #ff0033' }">
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(fromInputValue) ? fromInputValue : '#ffffff' }">
    </div>
    <div class="dash">-</div>
    <div class="colorBox" :style="{ backgroundColor: validateHexColor(toInputValue) ? toInputValue : '#ffffff' }"></div>
    <input type="text" ref="toInput" :value="toInputValue"
      @beforeinput="(e: Event) => { toInputValue = sanitizeHexInput(e) }"
      :style="{ border: validateHexColor(toInputValue) ? 'none' : '1px solid #ff0033' }">
    <button class="change">⇓</button>

  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, Ref, useTemplateRef } from 'vue';

const fromInputValue = defineModel("from")
const toInputValue = defineModel("to")
const fromInputRef: Ref<HTMLInputElement> = useTemplateRef("fromInput")
const toInputRef: Ref<HTMLInputElement> = useTemplateRef("toInput")


function validateHexColor(hexColorValue: string) {
  return /^#[a-fA-F0-9]{6}$/.test(hexColorValue)
}

const sanitizeHexInput = (event: InputEvent) => {
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
    fromInputRef.value.focus()
    fromInputRef.value.setSelectionRange(cursorPosition, cursorPosition);
  })

  return value
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.dash {
  color: #ffffff;
}

.colorBox {
  width: 20px;
  height: 20px;
}
</style>
