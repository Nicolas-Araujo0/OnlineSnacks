<script setup>
defineProps(["argent"])
</script>
<template>
    <b v-bind:class="(argent > 10) ? 'green' : 'red'">{{ argent }}€</b>
</template>
<style></style>