<script setup>
import { RouterView,useRoute } from 'vue-router'
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

const router = useRoute()
</script>

<template>
  <Header v-if="router.name != 'home'">
  </Header>
  <RouterView/>
  <Footer v-if="router.name != 'home'"></Footer>
</template>

<style scoped>
section {
  padding-bottom: 80px;
}

.nightMode footer,
.nightMode header {
  background-color: rgb(4, 11, 24);
}

.nightMode footer nav div a,
.nightMode header {
  color: white
}

.nightMode footer nav div a img {
  filter: invert(99%) sepia(2%) saturate(242%) hue-rotate(155deg) brightness(122%) contrast(100%);
}
</style>
