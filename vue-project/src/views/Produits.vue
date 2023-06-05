<script setup>

import { ref } from 'vue';
import { computed } from "vue"
const input = ref("")
const products = ref([])
const availableProducts = ref(null)


async function getProducts() {
    const uId = localStorage.id;
    const response = await fetch("http://localhost:8000/api/products?userId=" + uId);
    products.value = await response.json();
    availableProducts.value = products.value.filter((product) => product.stock > 0)
}
getProducts();

const types = ref([])
async function getType() {
    const response = await fetch("http://localhost:8000/api/products/type");
    types.value = await response.json();

}
getType()
const url = "http://localhost:8000/api/products/consume?id="
async function consume(product) {
    if (!(product.prix_salarie > localStorage.solde)) {
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
async function addFavoris(product) {
    product.fav = 1;
    const url = "http://localhost:8000/api/favoris/add";
    let uId = localStorage.id;
    let data = { id: product.id, userId: uId }
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


const filteredProducts = ref([]);


const searchedProducts = computed(() => products.value.filter((product) => { return product.nom.toLowerCase().includes(input.value.toLowerCase()) }))

function getProductsByCat(type) {
    return searchedProducts.value.filter(p => p.type == type)
}
function getImage(url){
    let imgSrc = "src/assets/img/" + url + ".png";
    return imgSrc
}
</script>
<template>
    <section class="base">
        <h1>Accueil</h1>

        <input type="text" name="text" id="text" placeholder="ex : croissant" v-model="input">
        <!-- boucle for create an h2 with title specific and article -->
        <div class="products">
            <template v-for="tip in types">
                <h2 v-if="getProductsByCat(tip.type).length != 0">{{ tip.type }}</h2>
                <article v-for="product in getProductsByCat(tip.type)" :key="product.id" class="products__product"
                    v-show="product.stock > 0">
                    <img :src="product.fav == 1 ? 'src/assets/img/star.png' : 'src/assets/img/etoile.png'" alt=""
                        class="product__rating" @click="product.fav != 1 ? addFavoris(product) : removeFavoris(product)">
                    <img :src=getImage(product.image) alt="" class="product__food">
                    <div><span>{{ product.nom }}</span>
                        <span>{{ product.stock }}</span>
                    </div>
                    <div class="product__buy">
                        <span>{{ product.prix_salarie }}€</span>
                        <button @click="consume(product), $emit('modifySolde', product.prix_salarie)">Acheter</button>
                    </div>
                </article>
            </template>

        </div>
    </section>
</template>
<style>
h2 {
    grid-column-start: 1;
    grid-column-end: 3;
    text-transform: capitalize;
}

input[type=text] {
    width: 70%;
    height: 25px;
    margin: 15px 15%;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
}

.base {
    margin: 1.5em;
}


.products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
}

.products .products__product {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: white;
    border: 0.5px solid #000000;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    position: relative;
}

.products .products__product>div:first-of-type {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
}

.products .products__product>div:first-of-type span:first-of-type {
    text-transform: capitalize;
}

.products .products__product>div:first-of-type span:last-of-type {
    font-weight: 600;
}

.products .products__product .product__rating {
    position: absolute;
    top: 0;
    width: 30px;
}

.products .products__product .product__food {
    width: 100%;
    height: 70%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.products .products__product .product__buy {
    display: flex;
    justify-content: space-between;
}

.products .products__product .product__buy span {
    align-self: center;
}

.products .products__product .product__buy,
.products .products__product span:nth-child(2) {
    padding: 0 10px;
}

.products .products__product .product__buy button {
    color: white;
    background-color: #FF6363;
    border-radius: 5px;
    border: 0.5px solid #000000;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.products .products__product .product__buy button:hover {
    cursor: pointer;
}
</style>