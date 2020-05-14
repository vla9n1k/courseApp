<template>
    <v-row align="center" justify="center">
        <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                class="ma-3"
        >
            <v-label>Sign Up</v-label>
            <v-text-field
                    v-model="name"
                    :counter="20"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="surname"
                    :counter="20"
                    :rules="surnameRules"
                    label="Surname"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="mobile"
                    label="Mobile"
                    :rules="mobileRules"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    type="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
            ></v-text-field>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click.prevent="signUpUser"
            >
                Register
            </v-btn>

            <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
            >
                Reset Form
            </v-btn>
        </v-form>
    </v-row>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        data: () => ({
            // modal: false,
            modalMessage: '',
            valid: true,
            password: null,
            mobile: '',
            mobileRules: [
                v => !!v || 'Mobile number is required',
                v => (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(v)) === true
            ],
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            surname: '',
            surnameRules: [
                v => !!v || 'Surname is required',
                v => (v && v.length <= 20) || 'Surname must be less than 20 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 7) || 'Password must be more than 7 characters',
            ],
            lazy: false,
        }),

        methods: {
            ...mapActions([
                'signUp',
                'addNotification'
            ]),
            async signUpUser() {
                this.$refs.form.validate();
                const registerData = {
                    name: this.name,
                    surname: this.surname,
                    mobile: this.mobile,
                    email: this.email,
                    password: this.password
                };
                const signUpResult = await this.signUp(registerData);
                this.addNotification({
                    id: Date.now(), text: signUpResult.success ? signUpResult.message : signUpResult.errors[0].msg,
                    type: signUpResult.success ? 'success' : 'error'
                });
                if (signUpResult.success) {
                    await this.$router.push('/login')
                }
            },
            reset() {
                this.$refs.form.reset()
            }
        },
    }
</script>