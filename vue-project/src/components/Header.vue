<script setup>
const nom = localStorage.nom
const prenom = localStorage.prenom
let solde = localStorage.solde

</script>

<template>
    <header class="header">
        <section>
            <img src="../assets/img/Logo.webp" alt="logo" class="header__logo">
            <div class="users">
                <div class="users__infos">
                    <span>{{ nom }} {{ prenom }} </span>
                    <span>Solde restant: <b v-bind:class="(solde > 10) ? 'green' : 'red'">{{ solde }}€</b></span>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/128/219/219969.png" alt="avatar" class="users__avatar">
            </div>
        </section>
        <!-- <input type="text" name="text" id="text" placeholder="ex : croissant"> -->
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

.green {
    color: green;
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

.header section .users {
    display: flex;
    column-gap: 10px;
}

.header section .users .users__avatar {
    width: 40px;
    height: 36px;
    align-self: center;
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
}
</style>