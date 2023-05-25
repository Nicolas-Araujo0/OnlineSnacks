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
                    <tr>
                        <td>2022/11/23</td>
                        <td>Croissant</td>
                        <td class="red">5.99€</td>
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