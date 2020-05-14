<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <app-loader v-if="!loaded"></app-loader>
                <v-row class="pa-2 justify-center" v-if="products.length > 0">
                    <app-car v-for="product in products" :product="product" :key="product.id"></app-car>
                </v-row>
                <h1 v-if="loaded && products.length === 0">Currently there is no any car for sale</h1>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import AppLoader from "../../src/components/modals/AppLoader";
    import Car from './Car'

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
                const response = await fetch(`${this.serverUrl}shop`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                let fetchedProducts = await response.json();
                let userId = localStorage.getItem('id');
                if (!!userId === false) {
                    this.loaded = true;
                    this.products = fetchedProducts;
                    return;
                }
                this.loaded = true;
                this.products = fetchedProducts.map(obj => {
                    if (userId.toString() !== obj.userId.toString()) {
                        this.loaded = true;
                        return {...obj}
                    }
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
