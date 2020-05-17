<template>
    <v-container fluid>
        <v-row class="justify-center">
            <v-col cols="4">
                <v-select
                        :items="orderOptions"
                        label="Order By"
                        item-text="name"
                        item-value="id"
                        v-model="selectedOrder"
                        @input="orderBy(selectedOrder)"
                        outlined
                ></v-select>
            </v-col>
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
            products: [],
            orderOptions: [
                {id: 0, name: 'Price Ascending'},
                {id: 1, name: 'Price Descending'},
                {id: 2, name: 'Brand name A-Z'},
                {id: 3, name: 'Brand name Z-A'},
            ],
            selectedOrder: null
        }),
        methods: {
            orderBy(id) {
                switch (id) {
                    case 0:
                        this.products.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
                        break;
                    case 1:
                        this.products.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
                        break;
                    case 2:
                        this.products.sort((a, b) => (a.brand.name > b.brand.name) ? 1 : ((b.brand.name > a.brand.name) ? -1 : 0));
                        break;
                    case 3:
                        this.products.sort((a, b) => (a.brand.name < b.brand.name) ? 1 : ((b.brand.name < a.brand.name) ? -1 : 0));
                        break;
                    default:
                        this.products.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
                }
            },
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
                this.orderBy();
            }
        },
        beforeMount() {
            this.fetchProducts();
        }
    }
</script>
