<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" v-cloak>
                <app-loader v-if="!loaded"></app-loader>
                <v-row class="pa-2 justify-center" v-if="loaded && products.length > 0">
                    <app-car v-for="product in products" :product="product" :key="product.id"></app-car>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import Car from './Car'
    import AppLoader from "../../src/components/modals/AppLoader";

    export default {
        components: {
            appCar: Car,
            appLoader: AppLoader
        },
        data: () => ({
            serverUrl: process.env.VUE_APP_SERVER_URL,
            loaded: false,
            products: []
        }),
        methods: {
            async fetchProducts() {
                const response = await fetch(`${this.serverUrl}products`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                let fetchedProducts = await response.json();
                this.loaded = true;
                this.products = fetchedProducts.map(obj => {
                    return {
                        ...obj,
                        owner: true
                    }
                });
            }
        },
        beforeMount() {
            this.fetchProducts();
        }
    }
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>