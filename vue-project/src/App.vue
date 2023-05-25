<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

const b = ref(null)
b.value = window.location.pathname.split('/')[1]
let c = b.value.length
</script>

<template>
  
  <Header v-if=" c != 0 "></Header>
  <!--
           <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
  -->

  <RouterView />
  <Footer v-if=" c != 0 "></Footer>
</template>

<style scoped></style>
