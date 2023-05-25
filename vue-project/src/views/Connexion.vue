<script>
import axios from "axios"

export default {
    name: 'PostFormAxios',
    data() {
        return {
            form: {
                email: '',
                pass: ''
            }
        }
    },
    methods: {
        submitForm() {
            axios.post("http://localhost:8000/api/user/login", this.form)
                .then((res) => {
                    localStorage.setItem('nom', res.data.nom)
                    localStorage.setItem('prenom', res.data.prenom)
                    localStorage.setItem('solde', res.data.budget)
                    localStorage.setItem('id', res.data.id)
                    if (localStorage.nom != "undefined" && localStorage.prenom != "undefined" && localStorage.solde != "undefined" && localStorage.id != "undefined") {
                        localStorage.setItem('isAuthenticated', true)
                        window.location.href = "Produits"
                    }else{
                        localStorage.setItem('isAuthenticated', false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                }).finally(() => {

                });
        }
    }
}
</script>

<template>
    <main id="index">
        <header class="banner">
            <img src="https://jardinage.lemonde.fr/images/dossiers/2017-12/pic-epeiche-1-135005.jpg" alt="logo"
                class="banner__image">
        </header>
        <form action="" v-on:submit.prevent="submitForm">
            <label for="email">Adresse mail :</label>
            <input type="email" name="email" id="email" placeholder="xxxxx@gmail.com" v-model="form.email">
            <label for="pass">Mot de passe :</label>
            <input type="password" name="pass" id="pass" placeholder="*******" v-model="form.pass">
            <input type="submit" value="Connexion">
            <a href="/Produits">Aller dans le site</a>
        </form>
    </main>
</template>
<style>
.banner {
    width: 80%;
    height: 25%;
    margin: 0 auto;
    padding: 10% 0;
}

.banner .banner__image {
    width: 100%;
    height: 100%;
}

form {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 40px;
    row-gap: 10px;
}

form input {
    width: 70%;
    height: 30px;
    margin: 0 auto 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    text-align: center;
}

form input[type=submit] {
    width: 35%;
    background-color: #1B3D01;
    color: white;
    transition: .5s;
}

form input[type=submit]:hover {
    cursor: pointer;
    background-color: green;
    color: black;
}
</style>