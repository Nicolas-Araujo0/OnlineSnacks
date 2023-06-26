<script setup>
import Test from './Test.vue'
import { provide, ref } from "vue";
import { myInjectionKey } from "../components/keys.js"

const text = ref("Hello")
function updateText(newText) {
    text.value = newText
}
provide(myInjectionKey, {text, updateText})
</script>

<template>
    <div>
        <Test></Test>
    </div>
</template>
