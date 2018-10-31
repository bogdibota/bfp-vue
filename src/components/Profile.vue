<template>
    <v-app id="inspire">
        <Header :headerTitle="'My profile'"/>
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

    import {saveAccessToken} from "../lib/facebook";


    export default Vue.extend({
        name: 'profile',
        created: function () {
            const hash = window.location.hash;
            if (hash && ~hash.indexOf("#access_token")) {
                const [, accessToken, expiresIn] = /#access_token=([a-zA-Z0-9]+)&expires_in=([0-9]+)/.exec(window.location);
                saveAccessToken(accessToken, expiresIn);
                this.$store.dispatch('login_success', accessToken);
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