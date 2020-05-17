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
                <v-icon left>rv_hookup</v-icon>
                Vehicles
            </v-tab>
            <v-tab @click="getInfo('engine')">
                <v-icon left>build</v-icon>
                Engines
            </v-tab>
            <v-tab @click="adminRequest('transactions')">
                <v-icon left>attach_money</v-icon>
                Transactions
            </v-tab>
            <v-tab @click="adminRequest('orders')">
                <v-icon left>shopping_cart</v-icon>
                Orders
            </v-tab>
            <v-tab @click="adminRequest('users')">
                <v-icon left>account_circle</v-icon>
                Users
            </v-tab>
            <v-tab @click="adminRequest('cars')">
                <v-icon left>directions_car</v-icon>
                Cars
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
            <v-tab-item>
                <app-loader v-if="!loaded"></app-loader>
                <v-row justify="center">
                    <v-form class="justify-center" ref="form"
                            style="max-width: 300px">
                        <v-text-field v-model="email" type="email" label="User email" required></v-text-field>
                        <v-text-field v-model="amount" type="number" step="0.01" label="Amount of funds" required></v-text-field>
                        <small>- before amount will subtract entered amount from user balance</small>
                        <v-btn color="blue darken-1" text @click.prevent="changeUserBalance">Submit</v-btn>
                    </v-form>
                </v-row>
                <v-data-table
                        :headers="transactionsHeaders"
                        :items="transactions"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="id"
                        class="elevation-1 ma-3 "
                ></v-data-table>
            </v-tab-item>
            <v-tab-item>
                <app-loader v-if="!loaded"></app-loader>
                <v-row justify="center">
                    <v-form class="justify-center" ref="form"
                            style="max-width: 300px">
                        <v-text-field v-model="orderId" type="number" label="Order Id" required></v-text-field>
                        <v-select label="Order Status" :items="orderStatuses" v-model="orderStatusId" item-text="name"
                                  item-value="id"></v-select>
                        <v-btn color="blue darken-1" text @click.prevent="orderStatusChange">Submit</v-btn>
                    </v-form>
                </v-row>
                <v-data-table
                        :headers="ordersHeaders"
                        :items="orders"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="id"
                        class="elevation-1 ma-3 "
                ></v-data-table>
            </v-tab-item>
            <v-tab-item>
                <app-loader v-if="!loaded"></app-loader>
                <v-data-table
                        :headers="usersHeaders"
                        :items="users"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="id"
                        class="elevation-1 ma-3 "
                ></v-data-table>
            </v-tab-item>
            <v-tab-item>
                <app-loader v-if="!loaded"></app-loader>
                <v-data-table
                        :headers="carsHeaders"
                        :items="cars"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="id"
                        class="elevation-1 ma-3 "
                ></v-data-table>
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
                orderId: null,
                orderStatusId: null,
                email: null,
                amount: null,
                brands: [],
                countries: [],
                conditions: [],
                vehicles: [],
                engines: [],
                transactions: [],
                users: [],
                orders: [],
                cars: [],
                orderStatuses: [],
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
                ],
                transactionsHeaders: [
                    {text: 'Transaction ID', align: 'start', value: 'id'},
                    {text: 'Sum', value: 'amount'},
                    {text: 'Date', value: 'date'},
                    {text: 'Description', value: 'comment'},
                    {text: 'Sender email', value: 'sender.email'},
                    {text: 'Receiver email', value: 'receiver.email'},
                ],
                ordersHeaders: [
                    {text: 'Order ID', align: 'start', value: 'id'},
                    {text: 'User email', value: 'user.email'},
                    {text: 'User name', value: 'user.name'},
                    {text: 'User telephone', value: 'user.telephone'},
                    {text: 'Status', value: 'order-status.name'},
                    {text: 'Order Item(car id)', value: 'order-items[0].carId'},
                ],
                usersHeaders: [
                    {text: 'User email', align: 'start', value: 'email'},
                    {text: 'Balance', value: 'balance'},
                    {text: 'Name', value: 'name'},
                    {text: 'Surname', value: 'surname'},
                    {text: 'Telephone', value: 'telephone'},
                ],
                carsHeaders: [
                    {text: 'Car ID', align: 'start', value: 'id'},
                    {text: 'Brand', value: 'brand.name'},
                    {text: 'Model', value: 'model'},
                    {text: 'Price',value: 'price'},
                    {text: 'Owner Email', value: 'user.email'},
                    {text: 'Sell Order created',value: 'createdAt'},
                    {text: 'Available for sale', value: 'isSold'},
                ],
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
                switch (typeUrl) {
                    case 'brand':
                        this.brands = await response.json();
                        this.loaded = true;
                        break;
                    case 'country':
                        this.countries = await response.json();
                        this.loaded = true;
                        break;
                    case 'condition':
                        this.conditions = await response.json();
                        this.loaded = true;
                        break;
                    case 'vehicle':
                        this.vehicles = await response.json();
                        this.loaded = true;
                        break;
                    case 'engine':
                        this.engines = await response.json();
                        this.loaded = true;
                        break;
                    default:
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
            },
            async adminRequest(typeUrl) {
                const response = await fetch(`${this.serverUrl}admin/${typeUrl}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                switch (typeUrl) {
                    case 'transactions':
                        this.transactions = data.transactions;
                        break;
                    case 'orders':
                        this.orders = data.orders;
                        break;
                    case 'users':
                        this.users = data.users;
                        break;
                    case 'cars':
                        this.cars = data.cars;
                        break;
                    default:
                        this.addNotification({
                            id: Date.now(),
                            text: 'Unable to get data, try again',
                            type: 'error'
                        })
                }
            },
            async getOrderStatuses() {
                const response = await fetch(`${this.serverUrl}settings/option/order-status`, {method: 'GET'});
                this.orderStatuses = await response.json();
            },
            async orderStatusChange() {
                let statusData = {
                    selectedOrderId: this.orderId,
                    newStatusId: this.orderStatusId
                };
                const result = await fetch(`${this.serverUrl}admin/orders/update`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(statusData)
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
            },
            async changeUserBalance() {
                let userData = {
                    email: this.email,
                    amount: +this.amount
                };
                const result = await fetch(`${this.serverUrl}admin/users/balance-update`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(userData)
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
            this.adminRequest('transactions');
            this.adminRequest('orders');
            this.adminRequest('users');
            this.adminRequest('cars');
            this.getOrderStatuses();
        }
    }
</script>
<style scoped>
    [v-cloak] {
        display: none;
    }
</style>