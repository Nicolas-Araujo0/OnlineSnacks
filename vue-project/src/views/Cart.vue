<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from "../views/store.vue";

const store = useCartStore();
const input = ref(1,Number)
function getImage(url) {
    let imgSrc = "src/assets/img/" + url + ".png";
    return imgSrc
}
const add = computed(() => input.value < 9 ? input.value++ : "");
const remove = computed(() => input.value > 0 ? input.value-- : "");
</script>
<template>
    <h1>Cart</h1>
    <section>
        <div v-for="product in store.content" :key="product.id">
            <img :src=getImage(product.image) alt="">
            <h2>{{ product.name }}</h2>
            <div class="quant">
                <img src="src/assets/img/plus.png" alt="" >
                <input type="number" v-model="input">
                <img src="src/assets/img/moins.png" alt="">
            </div>
            <span>{{ product.price }}</span>
        </div>
        <div class="quant">
            <img src="src/assets/img/moins.png" alt="" @click="input--">
            <input type="number" v-model="input">
            <img src="src/assets/img/plus.png" alt="" @click="input++">
        </div>
    </section>
</template>

<style>
.quant {
    width: max-content;
    display: flex;
    background-color: bisque;
    padding: 5px;
    border: 1px solid;
    border-radius: 10px;
}
.quant img {
    width: 30px;
}
.quant input {
    width: 50px;
    background-color: transparent;
    border: none;
    text-align : center;
}
</style>