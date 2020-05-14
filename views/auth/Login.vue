<template>
    <v-row align="center" justify="center" class="ma-3">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-label>Login</v-label>
            <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click.prevent="loginUser">
                Login
            </v-btn>
        </v-form>
    </v-row>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        data: () => ({
            valid: true,
            loader: false,
            password: null,
            email: null,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            lazy: false,
        }),

        methods: {
            ...mapActions([
                'login',
                'addNotification'
            ]),
            async loginUser() {
                const loginData = {
                    email: this.email,
                    password: this.password
                };
                const loginResult = await this.login(loginData);
                this.addNotification({
                    id: Date.now(),
                    text: loginResult.message,
                    type: loginResult.success ? 'success' : 'error'
                })
            }
        }
    }
</script>