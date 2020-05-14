<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list shaped>
                <v-subheader>Menu</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item to="/">
                        <v-list-item-icon>
                            <v-icon>store</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Shop</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="`/products/${userId}`" v-if="isLogged">
                        <v-list-item-icon>
                            <v-icon>directions_car</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>My Products</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/product-add" v-if="isLogged">
                        <v-list-item-icon>
                            <v-icon>add_box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Add Product</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/orders" v-if="isLogged">
                        <v-list-item-icon>
                            <v-icon>list_alt</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Orders</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/cart" v-if="isLogged">
                        <v-list-item-icon>
                            <v-icon>shopping_cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Cart</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/admin" v-if="isLogged && getRole !== 1">
                        <v-list-item-icon>
                            <v-icon>visibility</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Admin Panel</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="ml-3" outlined to="/login" v-if="!isLogged">Login</v-btn>
            <v-btn class="ml-3" outlined to="/signup" v-if="!isLogged">Sign Up</v-btn>
            <strong class="navbar-text ml-auto" v-if="isLogged">Balance: {{getBalance}}</strong>
            <v-btn class="ml-3" outlined to="/signup" v-if="isLogged" @click="logout">Logout</v-btn>
        </v-app-bar>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    export default {
        props: ['userId', 'balance'],
        data() {
            return {
                drawer: false,
                items: [
                    {icon: 'alarm', text: 'Shop', link: '/'},
                    {icon: 'alarm', text: 'My Products', link: '/products'},
                    {icon: 'alarm', text: 'Add Product', link: '/product-add'},
                    {icon: 'alarm', text: 'Orders', link: '/orders'},
                    {icon: 'alarm', text: 'Cart', link: '/cart'}
                ]
            }
        },
        computed: {
            ...mapGetters(['isLogged', 'getBalance', 'getRole'])
        },
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>
<style scoped>
</style>