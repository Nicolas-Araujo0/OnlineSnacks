<script setup>
import { storeToRefs } from "pinia";
import { useUserStore, useCartStore } from "./Store.vue"
import { useRouter, useRoute } from "vue-router";
const store = useUserStore();
const { budget } = storeToRefs(store);

const cart = useCartStore()
const { content } = storeToRefs(cart);
const router = useRouter();
const nom = localStorage.nom
const prenom = localStorage.prenom

function lougout() {
    localStorage.clear()
    router.push({ path: "/" })
}
</script>
<!--  -->
<template>
    <header class="header">
        <section>
            <img src="../assets/img/Logo.webp" alt="logo" class="header__logo">
            <div class="users">
                <div class="users__infos">
                    <span>{{ nom }} {{ prenom }} </span>
                    <span>Solde restant: <b v-bind:class="(budget > 10) ? 'green' : 'red'">{{ budget }}€</b></span>
                </div>
                <RouterLink to="/Cart" class="infos"><img src="https://cdn-icons-png.flaticon.com/128/219/219969.png" alt="avatar"
                        class="users__avatar"><span v-if="content.length > 0">{{content.length}}</span></RouterLink>
                <a @click="lougout()" class="lougout"><img src="src/assets/img/deco.png" alt=""></a>
            </div>
        </section>
    </header>
</template>
<style>
.header {
    background-color: whitesmoke;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid;
    color: black;
    z-index: 2;
}

b {
    font-weight: 600;
}
.infos{
    position: relative;
}
.infos span{
    position: absolute;
    top: -30%;
    left: 60%;
    width: 20px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    display: block;
    background-color: rgb(255, 56, 56);
    border-radius: 50%;
}
.green {
    color: green;
}

.red {
    color: red;
}

.header section {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    align-items: center;
}

.header section .header__logo {
    width: 35%;
}

.nightMode .header section .header__logo {
    filter: invert(99%) sepia(2%) saturate(242%) hue-rotate(155deg) brightness(122%) contrast(100%);
}

.header section .users {
    display: flex;
    column-gap: 10px;
}

.header section .users .users__avatar {
    width: 40px;
    height: 36px;
    align-self: center;
}

.header section .users .lougout {
    width: 20px;
}

.header section .users .lougout img {
    width: 100%;
    vertical-align: -webkit-baseline-middle;
}

.header section .users .users__infos {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: end;
}

.header input {
    width: 70%;
    height: 25px;
    margin: 15px auto;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
}</style>