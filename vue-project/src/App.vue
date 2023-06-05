<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

const b = ref(null)
b.value = window.location.pathname.split('/')[1]
let c = b.value.length

const solde = localStorage.solde
const userSolde = ref(solde)
</script>

<template>
  <Header v-if="c != 0" :userSolde='userSolde'>
  </Header>
  <RouterView @modifySolde="(productCost) => { if (userSolde > productCost) { userSolde -= productCost } }" />
  <Footer v-if="c != 0"></Footer>
</template>

<style scoped>
section {
  padding-bottom: 80px;
}

.nightMode footer,
.nightMode header{
  background-color: rgb(4, 11, 24);
}

.nightMode footer nav div a,
.nightMode header {
  color: white
}

.nightMode footer nav div a img{
  filter: invert(99%) sepia(2%) saturate(242%) hue-rotate(155deg) brightness(122%) contrast(100%);
}
</style>
