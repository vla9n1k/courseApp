<template>
    <div>
        <app-loader v-if="!loaded"></app-loader>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="orderItems.items"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :single-select="singleSelect"
                item-key="id"
                show-select
                class="elevation-1 ma-3 "
        ></v-data-table>
        <div class="text-center pt-2">
            <h1>Total amount: {{totalPrice}}</h1>
            <v-btn color="success" class="mr-2" :disabled="totalPrice == 0" @click="checkoutOrder">Checkout</v-btn>
            <v-btn color="error" class="mr-2" :disabled="selected.length == 0" @click="removeItems">Remove selected</v-btn>
        </div>
    </div>
</template>
<script>
    import AppLoader from "../../src/components/modals/AppLoader";
    import {mapActions} from 'vuex'
    export default {
        components: {
            appLoader: AppLoader
        },
        data() {
            return {
                serverUrl: process.env.VUE_APP_SERVER_URL,
                loaded: false,
                totalPrice: 0,
                singleSelect: false,
                selected: [],
                sortBy: 'price',
                sortDesc: false,
                headers: [
                    {text: 'Car ID', align: 'start', value: 'id'},
                    {text: 'Car Name', value: 'model'},
                    {text: 'Price', value: 'price'}
                ],
                orderItems: {},
            }
        },
        methods: {
            ...mapActions(['addNotification']),
            async checkoutOrder() {
                const product = this.orderItems.items.map(item => {
                    return {
                        itemId: item.id,
                        sellerId: item.userId
                    }
                });
                const result = await fetch(`${this.serverUrl}cart/checkout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        item: product,
                        totalSum: this.totalPrice
                    })
                });
                const data = await result.json();
                if (result.status === 200) {
                    data.success = true;
                }
                this.totalPrice = 0;
                await this.fetchUserCart();
                this.addNotification({
                    id: Date.now(),
                    text: data.message,
                    type: data.success ? 'success' : 'error'
                })
            },
            async removeItems() {
                const itemsToRemove = this.selected.map(item => item.id);
                await fetch(`${this.serverUrl}cart/delete-product`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemsToRemove
                    })
                });
                this.selected = [];
                await this.fetchUserCart();
            },
            nextSort() {
                let index = this.headers.findIndex(h => h.value === this.sortBy);
                index = (index + 1) % this.headers.length;
                this.sortBy = this.headers[index].value
            },
            async fetchUserCart() {
                const response = await fetch(`${this.serverUrl}cart`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.orderItems = await response.json();
                await this.countTotal();
                this.loaded = true
            },
            async countTotal() {
                this.totalPrice = this.orderItems.items.map(item => item.price).reduce((previousValue, currentValue) => {
                    return previousValue + currentValue
                }, 0);
            }
        },
        beforeMount() {
            this.fetchUserCart();
        }
    }
</script>