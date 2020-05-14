<template>
    <div class="modal">
        <transition-group name="fade">
            <v-alert v-for="notification in getNotifications"
                     :type="notification.type" :key="notification.id"
                     v-model="notification.show"
                     dismissible
                     class="modal-item"
            >
                {{notification.text}}
            </v-alert>
        </transition-group>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['getNotifications'])
        },
        methods: {
        }
    }
</script>
<style scoped>
    .modal {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        max-width: 300px;
        height: 100%;
        margin-bottom: 50px;
        z-index: 50;
    }

    .modal-item {
        z-index: 5;
        margin: 5px;
    }

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