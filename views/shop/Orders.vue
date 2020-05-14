<template>
    <v-card max-width="98%" class="mx-auto ma-3">
        <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-center">Your Orders</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <v-list-group
                    v-for="item in items"
                    :key="item.id"
                    v-model="item.active"
                    :prepend-icon="item.action"
                    no-action>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Order ID #{{item.id}}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Status: {{item.statusName}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                serverUrl: process.env.VUE_APP_SERVER_URL,
                items: [
                    {action: 'local_activity', title: 'Attractions', items: [{title: 'List Item'}]},
                ]
            }
        },
        methods: {
            async getOrders() {
                const result = await fetch(`${this.serverUrl}orders`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await result.json();
                this.items = data.orders;
            }
        },
        beforeMount() {
            this.getOrders();
        }
    }
</script>