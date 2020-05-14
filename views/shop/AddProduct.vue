<template>
    <v-row align="center" justify="center">
        <v-card min-width="550" flat outlined class="ma-3">
            <v-card-title>Add car to sale list</v-card-title>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy" class="ma-3">
                <v-select label="Brand" :items="brands" v-model="brand" item-text="name" item-value="id"></v-select>
                <v-text-field v-model="model" :rules="modelRules" label="Model" required></v-text-field>
                <v-text-field v-model="gearBox" label="Gear Box" required></v-text-field>
                <v-text-field v-model="color" label="Color" required></v-text-field>
                <v-text-field v-model="price" label="Price" required type="number"></v-text-field>
                <v-text-field v-model="mileage" label="Mileage" required type="number"></v-text-field>
                <v-text-field v-model="imageUrl" label="Image" required></v-text-field>
                <v-textarea label="Description" v-model="description"></v-textarea>
                <v-select label="Condition" :items="conditions" v-model="condition" item-text="type"
                          item-value="id"></v-select>
                <v-select label="Vehicle" :items="vehicles" v-model="vehicle" item-text="type" item-value="id"></v-select>
                <v-select label="Country" :items="countries" v-model="country" item-text="name" item-value="id"></v-select>
                <v-select label="Engine" :items="engines" v-model="engine" item-text="type" item-value="id"></v-select>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click.prevent="addProduct">Submit</v-btn>
                <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
            </v-form>
        </v-card>
    </v-row>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
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
            async addProduct() {
                this.$refs.form.validate();
                let productData = {
                    gearBox: this.gearBox,
                    model: this.model,
                    color: this.color,
                    price: this.price,
                    mileage: this.mileage,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    brand: this.brand,
                    condition: this.condition,
                    vehicle: this.vehicle,
                    country: this.country,
                    engine: this.engine,
                };
                this.$socket.emit('productAdd', productData);
                const result = await fetch(`${this.serverUrl}product-add`, {
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
                    this.reset()
                }
            },
            reset() {
                this.$refs.form.reset()
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
        }
    }
</script>