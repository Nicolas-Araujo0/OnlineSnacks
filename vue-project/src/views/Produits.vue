<script setup>
import { ref } from 'vue';
import solde from "../components/Header.vue"
const products = ref(null)
const availableProducts = ref(null)
async function getProducts() {
    const response = await fetch("http://localhost:8000/api/products");
    products.value = await response.json();
    availableProducts.value = products.value.filter((product) => product.stock)
}
getProducts();

const url = "http://localhost:8000/api/products/consume?id="
async function consume(product) {
    if (!(product.prix_salarie > localStorage.solde)) {
        const response = await fetch(url + product.id + "&userId=" + localStorage.id);
        let result = await response.json()
        if (result.result != "error") {
            product.stock--
            localStorage.solde = localStorage.solde - product.prix_salarie
            solde = localStorage.solde
            if (product.stock == 0) {
                alert("You took the last " + product.nom)
            }
        }
    } else {
        alert("Ya plus de sous")
    }
}

</script>

<template>
    <section class="base">
        <h1>Accueil</h1>
        <input type="text" name="text" id="text" placeholder="ex : croissant">
        <!-- boucle for create an h2 with title specific and article -->
        <h2>Sandwiches :</h2>
        <div class="products">
            <article v-for="product in availableProducts" :key="product.id" class="products__product">
                <img src="../assets/img/etoile.png" alt="" class="product__rating">
                <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/42/4d/86/424d8655-8a04-875e-3121-bb0444fb8ae6/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/256x256bb.jpg"
                    alt="" class="product__food">
                <div><span>{{ product.nom }}</span>
                    <span>{{ product.stock }}</span>
                </div>
                <div class="product__buy">
                    <span>{{ product.prix_salarie }}€</span>
                    <button @click="() => consume(product)">Acheter</button>
                </div>
            </article>
        </div>
    </section>
</template>
<style>
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
    padding-bottom: 80px;
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