<template>
    <footer>
        <nav>
            <div><a href="/Favoris "><img src="../assets/img/etoile.png" alt="icon"><span>Favoris</span></a></div>
            <div><a href="/Produits"><img src="../assets/img/abri.png" alt="icon"><span>Accueil</span></a></div>
            <div><a href="/Historique"><img src="../assets/img/historique.png" alt="icon"><span>Historique</span></a></div>
            <div><a href="/Contact"><img src="../assets/img/email.png" alt="icon"><span>Contact</span></a></div>
        </nav>
    </footer>
</template>
<style>
footer {
    position: sticky;
    bottom: 0;
    background-color: white;
    display: flex;
    border-top: 1px solid;
}

footer nav {
    width: 90%;
    margin: auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

footer nav div {
    width: 25%;

}

footer nav div a {
    display: flex;
    flex-direction: column;
    color: black;
    text-decoration: none;
}

footer nav div a img {
    width: 50%;
    margin: 0 auto;
}
</style>