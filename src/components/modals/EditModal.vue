<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Car</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <v-form ref="form" v-model="valid" :lazy-validation="lazy" style="width: 100%">
                                <v-select label="Brand" :items="brands" v-model="brand" item-text="name"
                                          item-value="id"></v-select>
                                <v-text-field v-model="model" :rules="modelRules" label="Model" required></v-text-field>
                                <v-text-field v-model="gearBox" label="Gear Box" required></v-text-field>
                                <v-text-field v-model="color" label="Color" required></v-text-field>
                                <v-text-field v-model="price" label="Price" required type="number"></v-text-field>
                                <v-text-field v-model="mileage" label="Mileage" required type="number"></v-text-field>
                                <v-text-field v-model="imageUrl" label="Image" required></v-text-field>
                                <v-textarea label="Description" v-model="description"></v-textarea>
                                <v-select label="Condition" :items="conditions" v-model="condition" item-text="type"
                                          item-value="product.condition.id"></v-select>
                                <v-select label="Vehicle" :items="vehicles" v-model="vehicle" item-text="type"
                                          item-value="product.vehicle.id"></v-select>
                                <v-select label="Country" :items="countries" v-model="country" item-text="name"
                                          item-value="product.country.id"></v-select>
                                <v-select label="Engine" :items="engines" v-model="engine" item-text="type"
                                          item-value="product.engine.id"></v-select>
                            </v-form>
                        </v-row>
                    </v-container>
                    <small>*Changed fields will be updated for current product</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.prevent="closeEdit">Close</v-btn>
                    <v-btn color="blue darken-1" text @click.prevent="changeProduct">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        props: ['dialog', 'product'],
        data: () => ({
            serverUrl: process.env.VUE_APP_SERVER_URL,
            valid: true,
            name: '',
            model: '',
            color: '',
            description: '',
            gearBox: '',
            imageUrl: '',
            price: 0,
            mileage: 0,
            condition: null,
            country: null,
            brand: null,
            vehicle: null,
            engine: null,
            brands: [],
            countries: [],
            conditions: [],
            vehicles: [],
            engines: [],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 16 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            modelRules: [
                v => !!v || 'Model is required',
            ],
            select: null,
            items: ['test'],
            lazy: false,
        }),

        methods: {
            ...mapActions(['addNotification']),
            closeEdit() {
                this.$emit('closed')
            },
            async changeProduct() {
                this.$refs.form.validate();
                let productData = {
                    productId: this.product.id,
                    gearBox: this.gearBox,
                    model: this.model,
                    color: this.color,
                    price: this.price,
                    mileage: this.mileage,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    brand: this.brand.id,
                    condition: this.condition.id,
                    vehicle: this.vehicle.id,
                    country: this.country.id,
                    engine: this.engine.id,
                };
                const result = await fetch('http://localhost:3000/product/update', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(productData)
                });
                const data = await result.json();
                this.addNotification({
                    id: Date.now(),
                    text: data.message,
                    type: data.success ? 'success' : 'error'
                });
                if (data.success) {
                    this.closeEdit()
                }
            },
            async getItem(item) {
                const response = await fetch(`${this.serverUrl}settings/option/${item}`, {method: 'GET'});
                if (item === 'brand') {
                    this.brands = await response.json();
                } else if (item === 'country') {
                    this.countries = await response.json();
                } else if (item === 'condition') {
                    this.conditions = await response.json();
                } else if (item === 'vehicle') {
                    this.vehicles = await response.json();
                } else if (item === 'engine') {
                    this.engines = await response.json();
                }
            }
        },
        beforeMount() {
            this.getItem('brand');
            this.getItem('country');
            this.getItem('condition');
            this.getItem('vehicle');
            this.getItem('engine');
            this.brand = this.product.brand;
            this.model = this.product.model;
            this.gearBox = this.product.gearbox;
            this.color = this.product.color;
            this.price = this.product.price;
            this.mileage = this.product.mileage;
            this.imageUrl = this.product.imageUrl;
            this.description = this.product.description;
            this.condition = this.product.condition;
            this.vehicle = this.product.vehicle;
            this.country = this.product.country;
            this.engine = this.product.engine;
        }
    }
</script>