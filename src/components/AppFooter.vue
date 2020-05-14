<template>
    <v-footer app>
        <span>&copy; {{date}}</span>
    </v-footer>
</template>
<script>
    export default {
        data() {
            return {
                date: null
            }
        },
        methods: {
            getDate() {
                let now = new Date();
                this.date = now.getFullYear().toString()
            }
        },
        beforeMount() {
            this.getDate()
        }
    }
</script>