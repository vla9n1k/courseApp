<template>
    <v-card>
        <v-toolbar flat dark>
            <v-toolbar-title>Admin Panel</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab @click="getInfo('brand')">
                <v-icon left>mdi-account</v-icon>
                Brands
            </v-tab>
            <v-tab @click="getInfo('country')">
                <v-icon left>terrain</v-icon>
                Countries
            </v-tab>
            <v-tab @click="getInfo('condition')">
                <v-icon left>equalizer</v-icon>
                Conditions
            </v-tab>
            <v-tab @click="getInfo('vehicle')">
                <v-icon left>directions_car</v-icon>
                Vehicles
            </v-tab>
            <v-tab @click="getInfo('engine')">
                <v-icon left>build</v-icon>
                Engines
            </v-tab>
            <v-tab @click="getInfo('engine')">
                <v-icon left>attach_money</v-icon>
                Transactions
            </v-tab>
            <v-tab @click="getInfo('engine')">
                <v-icon left>shopping_cart</v-icon>
                Orders
            </v-tab>
            <v-tab @click="getInfo('engine')">
                <v-icon left>account_circle</v-icon>
                Users
            </v-tab>
            <v-tab-item v-cloak>
                <div>
                    <app-loader v-if="!loaded"></app-loader>
                    <v-data-table
                            :headers="brandsHeaders"
                            :items="brands"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            item-key="id"
                            class="elevation-1 ma-3 "
                    ></v-data-table>
                    <v-form v-model="valid">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                            v-model="brandName"
                                            :rules="brandNameRules"
                                            label="Brand name"
                                            required
                                    ></v-text-field>
                                    <v-btn color="success" class="mr-2" @click="addItem('brand', brandName)">Add</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-tab-item>
            <v-tab-item v-cloak>
                <div>
                    <app-loader v-if="!loaded"></app-loader>
                    <v-data-table
                            :headers="countriesHeaders"
                            :items="countries"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            item-key="id"
                            class="elevation-1 ma-3 "
                    ></v-data-table>
                    <v-form v-model="valid">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                            v-model="countryName"
                                            :rules="countryNameRules"
                                            label="Country name"
                                            required
                                    ></v-text-field>
                                    <v-btn color="success" class="mr-2" @click="addItem('country', countryName)">Add
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-tab-item>
            <v-tab-item v-cloak>
                <div>
                    <app-loader v-if="!loaded"></app-loader>
                    <v-data-table
                            :headers="conditionsHeaders"
                            :items="conditions"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            item-key="id"
                            class="elevation-1 ma-3 "
                    ></v-data-table>
                    <v-form v-model="valid">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                            v-model="conditionName"
                                            :rules="conditionNameRules"
                                            label="Condition name"
                                            required
                                    ></v-text-field>
                                    <v-btn color="success" class="mr-2" @click="addItem('condition', conditionName)">
                                        Add
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-tab-item>
            <v-tab-item v-cloak>
                <div>
                    <app-loader v-if="!loaded"></app-loader>
                    <v-data-table
                            :headers="vehiclesHeaders"
                            :items="vehicles"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            item-key="id"
                            class="elevation-1 ma-3 "
                    ></v-data-table>
                    <v-form v-model="valid">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                            v-model="vehicleName"
                                            :rules="vehicleNameRules"
                                            label="Vehicle name"
                                            required
                                    ></v-text-field>
                                    <v-btn color="success" class="mr-2" @click="addItem('vehicle', vehicleName)">Add
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-tab-item>
            <v-tab-item v-cloak>
                <div>
                    <app-loader v-if="!loaded"></app-loader>
                    <v-data-table
                            :headers="enginesHeaders"
                            :items="engines"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            item-key="id"
                            class="elevation-1 ma-3 "
                    ></v-data-table>
                    <v-form v-model="valid">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                            v-model="engineName"
                                            :rules="engineNameRules"
                                            label="Engine name"
                                            required
                                    ></v-text-field>
                                    <v-btn color="success" class="mr-2" @click="addItem('engine', engineName)">Add
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>
<script>
    import {mapActions} from 'vuex'
    import AppLoader from "../../src/components/modals/AppLoader";

    export default {
        components: {
            appLoader: AppLoader
        },
        data() {
            return {
                serverUrl: process.env.VUE_APP_SERVER_URL,
                valid: false,
                brandName: '',
                countryName: '',
                conditionName: '',
                vehicleName: '',
                engineName: '',
                brandNameRules: [
                    v => !!v || 'Brand name is required',
                    v => v.length >= 2 && v.length <= 20 || 'Name must be less than 20 characters',
                ],
                countryNameRules: [
                    v => !!v || 'Country name is required',
                    v => v.length >= 2 && v.length <= 20 || 'Name must be less than 20 characters',
                ],
                conditionNameRules: [
                    v => !!v || 'Condition name is required',
                    v => v.length >= 2 && v.length <= 20 || 'Name must be less than 20 characters',
                ],
                vehicleNameRules: [
                    v => !!v || 'Vehicle name is required',
                    v => v.length >= 2 && v.length <= 20 || 'Name must be less than 20 characters',
                ],
                engineNameRules: [
                    v => !!v || 'Engine name is required',
                    v => v.length >= 2 && v.length <= 20 || 'Name must be less than 20 characters',
                ],
                brands: [],
                countries: [],
                conditions: [],
                vehicles: [],
                engines: [],
                loaded: false,
                sortBy: 'id',
                sortDesc: false,
                brandsHeaders: [
                    {text: 'Brand ID', align: 'start', value: 'id'},
                    {text: 'Brand Name', value: 'name'},
                ],
                countriesHeaders: [
                    {text: 'Country ID', align: 'start', value: 'id'},
                    {text: 'Country Name', value: 'name'},
                ],
                conditionsHeaders: [
                    {text: 'Condition ID', align: 'start', value: 'id'},
                    {text: 'Condition', value: 'type'},
                ],
                vehiclesHeaders: [
                    {text: 'Vehicle ID', align: 'start', value: 'id'},
                    {text: 'Vehicle', value: 'type'},
                ],
                enginesHeaders: [
                    {text: 'Engine ID', align: 'start', value: 'id'},
                    {text: 'Engine', value: 'type'},
                ]
            }
        },
        methods: {
            ...mapActions(['addNotification']),
            nextSort() {
                let index = this.headers.findIndex(h => h.value === this.sortBy);
                index = (index + 1) % this.headers.length;
                this.sortBy = this.headers[index].value
            },
            async getInfo(typeUrl) {
                const response = await fetch(`${this.serverUrl}settings/option/${typeUrl}`, {method: 'GET'});
                if (typeUrl === 'brand') {
                    this.brands = await response.json();
                    this.loaded = true
                } else if (typeUrl === 'country') {
                    this.countries = await response.json();
                    this.loaded = true
                } else if (typeUrl === 'condition') {
                    this.conditions = await response.json();
                    this.loaded = true
                } else if (typeUrl === 'vehicle') {
                    this.vehicles = await response.json();
                    this.loaded = true
                } else if (typeUrl === 'engine') {
                    this.engines = await response.json();
                    this.loaded = true
                } else {
                    this.addNotification({
                        id: Date.now(),
                        text: 'Can not find options, try again',
                        type: 'error'
                    });
                }

            },
            async addItem(typeUrl, item) {
                const itemObj = {
                    name: item
                };
                const result = await fetch(`${this.serverUrl}settings/option/${typeUrl}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(itemObj)
                });
                const data = await result.json();
                if (result.status === 200) {
                    data.success = true
                }
                this.addNotification({
                    id: Date.now(),
                    text: data.message,
                    type: data.success ? 'success' : 'error'
                });
            }
        },
        beforeMount() {
            this.getInfo('brand');
            this.getInfo('country');
            this.getInfo('condition');
            this.getInfo('vehicle');
            this.getInfo('engine');
        }
    }
</script>
<style scoped>
    [v-cloak] {
        display: none;
    }
</style>