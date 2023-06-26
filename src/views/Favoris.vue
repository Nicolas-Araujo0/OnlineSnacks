<script setup>
import { ref } from 'vue';

const favoris = ref(null);
const availableProducts = ref(null);
let title = "Favoris";
async function getFavoris() {
    const userId = localStorage.id;
    const response = await fetch("http://localhost:8000/api/favoris?id=" + userId);
    favoris.value = await response.json();
    if (favoris.value != "noFavs") {
        availableProducts.value = favoris.value.filter((product) => product.stock > 0)
    } else {
        title = "Pas de favoris";
    }
}
getFavoris();

const url = "http://localhost:8000/api/products/consume?id="
async function consume(product) {
    if (!(product.prix > localStorage.solde)) {
        const response = await fetch(url + product.id + "&userId=" + localStorage.id);
        let result = await response.json()
        if (result.result != "error") {
            product.stock--
            localStorage.solde = localStorage.solde - product.prix_salarie
            if (product.stock == 0) {
                alert("You took the last " + product.nom)
            }
        }
    } else {
        alert("Ya plus de sous")
    }
}
async function removeFavoris(product) {
    product.fav = 0;
    const url = "http://localhost:8000/api/favoris/remove";
    let userId = localStorage.id;
    let data = { id: product.id, userId: userId }
    const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    await rawResponse.json()
}
function getImage(url) {
    let imgSrc = "src/assets/img/" + url + ".png";
    return imgSrc
}
</script>
<template>
    <section class="base">
        <h1 v-bind:class="favoris == 'noFavs' ? 'centered' : ''">{{ title }}</h1>
        <!-- boucle for create an h2 with title specific and article for each -->
        <h2 v-if="favoris != 'noFavs'">Sandwiches :</h2>
        <div class="products" v-if="favoris != 'noFavs'">
            <article class="products__product" v-for="product in availableProducts" :key="product.id"
                v-show="product.fav == 1">
                <img src="../assets/img/star.png" alt="" class="product__rating" @click="removeFavoris(product)">
                <img :src=getImage(product.image) alt="" class="product__food">
                <div><span>{{ product.nom }}</span>
                    <span>{{ product.stock }}</span>
                </div>
                <div class="product__buy">
                    <span>{{ product.prix }}€</span>
                    <button @click="consume(product), $emit('modifySolde', product.prix)">Acheter</button>
                </div>
            </article>
        </div>
    </section>
</template>
<style>
.centered {
    text-align: center;
    vertical-align: middle;
    font-size: 40px;
}
</style>