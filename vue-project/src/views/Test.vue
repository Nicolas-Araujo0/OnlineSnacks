<script setup>
import { inject, ref } from "vue";
import { myInjectionKey } from "../components/keys.js"
import { useCounterStore } from "./store.vue";
// const { text, updateText } = inject(myInjectionKey);
const { text, updateText } = inject(myInjectionKey);
const inputText = ref("")
function modifyText() {
    updateText(inputText.value)
}
const store = useCounterStore()
</script >


<template>
    <h3>{{ text }}</h3>
    <h4>{{ store.name }}</h4>
    <input type="text" name="ze" id="ze" v-model="inputText">
    <button @click="modifyText()">Modify text</button>
</template>
<style></style>