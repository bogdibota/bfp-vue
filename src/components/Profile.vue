<template>
    <v-app id="inspire">
        <Header/>
        <v-content>
            <v-container fluid fill-height>
                <v-layout
                        align-center
                        column
                >
                    <v-avatar size="80px">
                        <img
                                v-if="user.avatar"
                                :src="user.avatar"
                                alt="Avatar"
                        >
                    </v-avatar>
                    {{ user.name }}
                    <br/>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import router from '../router'
    import Avatar from 'vue-avatar'
    import Header from './Header'

    export default Vue.extend({
        name: 'profile',
        created: function () {
            // `this` points to the vm instance
            const regex = /access_token=(.*)&/g.exec(window.location);
            if (regex && regex[1]) {
                this.$store.dispatch('login', regex[1]);
            }
        },
        methods: {
            navigate() {
                router.push({name: "home"});
            },
        },
        computed: {
            user: function () {
                return this.$store.state.user
            },
        },
        components: {
            Avatar,
            Header
        },
    });
</script>