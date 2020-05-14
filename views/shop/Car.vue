<template>
    <div>
    <v-card class="ma-3" max-width="300" ripple v-if="!product.isSold">
        <v-img :src="product.imageUrl" height="200px"></v-img>
        <v-card-title>
            {{product.brand.name}}
        </v-card-title>
        <v-card-subtitle>
            Model: {{product.model}}
        </v-card-subtitle>
        <v-card-subtitle>
            Owner: {{product.user.name}} | {{product.user.telephone}}
        </v-card-subtitle>
        <v-card-subtitle>
            Country: {{product.country.name}}
        </v-card-subtitle>
        <v-card-subtitle>
            Mileage: {{product.mileage}}
        </v-card-subtitle>
        <v-card-subtitle>
            Condition: {{product.condition.type}}
        </v-card-subtitle>
        <v-card-title>
            Price: {{product.price}} $
        </v-card-title>
        <v-card-actions>
            <v-btn text v-if="isLogged && !product.owner" @click="addToCart(product)">Add to cart</v-btn>
            <app-edit-modal :dialog="editMode" :product="product" @closed="editMode = false"></app-edit-modal>
            <v-btn text v-if="isLogged && product.owner" @click.native="editMode = true">Edit</v-btn>
            <v-btn text v-if="isLogged && product.owner" @click="deleteItem(product)">Delete</v-btn>
            <v-btn text color="purple" @click="show = !show">
                Explore
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-subtitle>
                    Color: {{product.color}}
                </v-card-subtitle>
                <v-card-subtitle>
                    Vehicle: {{product.vehicle.type}}
                </v-card-subtitle>
                <v-card-subtitle>
                    Gearbox: {{product.gearbox}}
                </v-card-subtitle>
                <v-card-subtitle>
                    Engine: {{product.engine.type}}
                </v-card-subtitle>
                <v-card-text>
                    Description: {{product.description}}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import EditModal from "../../src/components/modals/EditModal";

    export default {
        components: {
            appEditModal: EditModal
        },
        props: ["product", "owner"],
        data: () => ({
            serverUrl: process.env.VUE_APP_SERVER_URL,
            editMode: false,
            show: false
        }),
        computed: {
            ...mapGetters(['isLogged'])
        },
        methods: {
            ...mapActions([
                'addNotification'
            ]),
            async addToCart(product) {
                let carToAdd = {
                    itemId: product.id,
                };
                const result = await fetch(`${this.serverUrl}product/add-to-cart`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(carToAdd)
                });
                if (result.status === 200) {
                    result.success = true;
                }
                const data = await result.json();
                this.addNotification({
                    id: Date.now(),
                    text: data.message,
                    type: result.success ? 'success' : 'error'
                })
            },
            async deleteItem(product) {
                let carToRemove = {
                    itemId: product.id,
                };
                const result = await fetch(`${this.serverUrl}product/remove`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(carToRemove)
                });
                if (result.status === 200) {
                    result.success = true;
                }
                const data = await result.json();
                this.addNotification({
                    id: Date.now(),
                    text: data.message,
                    type: result.success ? 'success' : 'error'
                })
            }
        }
    }
</script>