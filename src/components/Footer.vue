<template>
    <footer>
        <nav>
            <div>
                <RouterLink to="/Favoris"><img src="../assets/img/etoile.png" alt="icon"><span>Favoris</span></RouterLink>
            </div>
            <div>
                <RouterLink to="/Produits"><img src="../assets/img/abri.png" alt="icon"><span>Accueil</span></RouterLink>
            </div>
            <div>
                <RouterLink to="/Historique"><img src="../assets/img/historique.png" alt="icon"><span>Historique</span>
                </RouterLink>
            </div>
            <div>
                <RouterLink to="/Contact"><img src="../assets/img/email.png" alt="icon"><span>Contact</span></RouterLink>
            </div>
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

.nightMode footer nav div a {
    color: white
}

.nightMode footer nav div a img {
    filter: invert(99%) sepia(2%) saturate(242%) hue-rotate(155deg) brightness(122%) contrast(100%);
}
</style>
