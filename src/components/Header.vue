<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <v-list dense>
                <v-list-tile @click="navigate('home')">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="navigate('profile')">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Profile</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- Andreea O-->
                <v-list-tile @click="navigate('groups')">
                    <v-list-tile-action>
                        <v-icon>group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Groups</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{headerTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="loggedIn() === null" flat @click="login()">Login with facebook</v-btn>
            <v-btn v-else flat @click="logout()">Logout</v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {facebookLoginUrl, removeAccessToken} from "../lib/facebook";

    export default Vue.extend({
        name: 'Header',
        methods: {
            navigate(to) {
                this.$router.push({name: to});
            },
            loggedIn() {
                return this.$store.state.user.accessToken
            },
            login() {
                window.location.href = facebookLoginUrl
            },
            logout() {
                removeAccessToken();
                this.$store.dispatch('logout');
            },
        },
        data: () => ({
            drawer: false,

        }),
        props: ['headerTitle']


    });
</script>
