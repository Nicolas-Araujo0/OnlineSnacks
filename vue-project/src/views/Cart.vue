<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useCartStore, useUserStore } from "../components/Store.vue";
import { RouterLink } from 'vue-router';

const { updateBudget } = useUserStore();


const store = useCartStore();
const { content } = storeToRefs(store)
function getImage(url) {
    let imgSrc = "src/assets/img/" + url + ".png";
    return imgSrc
}
async function payCart() {
    const url = "http://localhost:8000/api/products/cart";
    let uId = localStorage.id;
    let data = { userId: uId, content: content.value }
    const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let response = await rawResponse.json()
    if (response.budget != null) {
        updateBudget(response.budget);
        recap.value = true;
    } else {
        alert("Vous êtes pauvres")
    }

}

const totalAmount = computed(() => {
    let total = 0;
    for (let index = 0; index < content.value.length; index++) {
        total += (content.value[index].prix_salarie * content.value[index].quantity)
    }
    return total;
})
const recap = ref(Boolean);
recap.value = false;
</script>
<template>
    <section class="base">
        <h1>{{ content.length == 0 ? "Votre panier est vide" : "Panier" }}</h1>
        <article v-for="product in content" :key="product.id" class="cart__product">
            <img :src=getImage(product.image) :alt="product.image">
            <div>
                <h2>{{ product.nom }}</h2>
                <h3>{{ product.prix_salarie }}€/u</h3>
                <div>
                    <div class="quant">
                        <img src="src/assets/img/moins.png" alt="" @click="product.quantity > 1 ? product.quantity-- : ''">
                        <input type="tel" v-model="product.quantity">
                        <img src="src/assets/img/plus.png" alt="" @click="product.quantity < 9 ? product.quantity++ : ''">
                    </div>
                    <span></span>
                    <span class="total">Total : {{ product.prix_salarie * product.quantity }}€</span>
                </div>
            </div>
        </article>
        <div class="cart__payment" v-if="content.length > 0">
            <span class="total">Total : {{ totalAmount }}€</span>
            <button class="cart__Validate" @click="payCart()">Pay cart</button>
        </div>
        <img src="src/assets/img/cartEmpty.png" alt="" class="cart__image" v-if="content.length == 0">
        <div class="background" v-if="recap">
            <div class="paidElement">
                <h3>Récapitulatif d'achat</h3>
                <article v-for="product in content" :key="product.id">
                    <img :src=getImage(product.image) :alt="product.image">
                    <h4>{{ product.nom }}</h4>
                    <span>{{ product.prix_salarie }}€</span>
                </article>
                <button @click="()=> {content = []; recap = !recap}">Clean cart</button>
            </div>
        </div>
    </section>
</template>

<style>
.cart__image {
    width: 100%;
}

.quant {
    width: max-content;
    height: 30px;
    display: flex;
    background-color: rgb(255, 255, 255);
    padding: 5px;
    border: 1px solid;
    border-radius: 10px;
}

.quant img {
    width: 20px;
}

.quant input {
    width: 30px;
    background-color: transparent;
    border: none;
    text-align: center;
}

.cart__product {
    display: flex;
    justify-content: space-around;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px 5px;
    background-color: white;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
}

.cart__product h2 {
    margin: 0;
}

.cart__product h3 {
    font-size: 14px;
}

.cart__product>img {
    width: 30%;
}

.cart__product>div {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.cart__product>div>div {
    display: flex;
    justify-content: space-between;
}

.cart__product span {
    align-self: center;
}

.cart__Validate {
    width: 40%;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(31, 189, 31);
    transition: .6s;
    font-size: 16px;
}

.cart__Validate:hover {
    background-color: rgb(85, 255, 85);
}

.cart__product .total {
    font-size: 15px;
    font-weight: 600;
}

.total {
    font-weight: 600;
    font-size: 18px;
}

.cart__payment {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
}

.paidElement {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 80%;
    height: fit-content;
    margin: 5% auto;
    padding: 10px 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5);
}
.paidElement img{
    width: 35%;
}
.paidElement h3 {
    font-weight: 600;
    text-decoration: underline;
}
.paidElement h4 {
    font-weight: 600;
    text-transform: capitalize;
}
.paidElement h3,
.paidElement h4,
.paidElement span{
    align-self: center;
}
.paidElement article {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.paidElement button{
    width: 125px;
    height: 30px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: rgb(31, 189, 31);
    transition: .6s;
}
</style>