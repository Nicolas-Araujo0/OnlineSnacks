<script setup>
import { ref } from 'vue';

const logs = ref(null)
async function getHistorique() {
    const userId = localStorage.id;
    const response = await fetch("http://localhost:8000/api/historique?id="+userId);
    logs.value = await response.json();
}

getHistorique();
</script>
<template>
    <section class="base">
            <h1>Historique</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Coûts</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- new tr foreach logs-->
                    <tr v-for="log in logs" :key="log.id">
                        <td>{{ log.dateAchat }}</td>
                        <td>{{ log.produitNom }}</td>
                        <td class="red">{{ log.produitCouts }}€</td>
                    </tr>
                </tbody>
            </table>
        </section>
</template>
<style>
table{
    width: 100%;
    text-align: center;
}
thead{
    font-weight: 600;
}
table thead th {
    width: 33%;
}
tr{
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
td{
    padding: 5px 0;
} </style>