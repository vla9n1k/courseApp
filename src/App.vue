<template>
    <div id="app">
        <v-app id="inspire">
            <app-header :userId="getId"></app-header>
            <v-content>
                <router-view></router-view>
            </v-content>
            <transition name="fade">
                <app-modal @mouseenter.native="removeNotify" v-if="getNotifications.length > 0"></app-modal>
            </transition>
            <app-footer></app-footer>
        </v-app>
    </div>
</template>
<script>
    import AppHeader from "./components/AppHeader";
    import AppFooter from "./components/AppFooter";
    import AppModal from "./components/modals/AppModal";
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        components: {
            appHeader: AppHeader,
            appFooter: AppFooter,
            appModal: AppModal
        },
        props: {
            source: String,
        },
        data: () => ({}),
        methods: {
            ...mapMutations(['removeLastNotify']),
            removeNotify() {
                this.removeLastNotify()
            }
        },
        created() {
            this.$vuetify.theme.dark = true;
            const expiryDate = localStorage.getItem('expiryDate');
            if (!expiryDate) {
                return
            }
            this.$store.dispatch('setAutoLogout', this.timeToLogOut);
            this.$socket.emit('getBalance', {
                id: this.getId
            });
        },
        computed: {
            ...mapGetters(['getNotifications', 'getId']),
            timeToLogOut() {
                const expiryDate = localStorage.getItem('expiryDate');
                let now = new Date;
                return new Date(expiryDate) - now;
            }
        }
    }
</script>
<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }
</style>