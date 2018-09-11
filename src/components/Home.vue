<template>
    <div class="home page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">Home page</span>
                <md-button class="md-button" @click="login()">
                    login
                </md-button>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>move_to_inbox</md-icon>
                        <span class="md-list-item-text">Inbox</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>send</md-icon>
                        <span class="md-list-item-text">Sent Mail</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Trash</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>error</md-icon>
                        <span class="md-list-item-text">Spam</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>

            </md-app-content>
        </md-app>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        flex: 1;
        display: flex;
        height: border-box;
    }

    .md-app {
        flex: 1;
        min-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .md-title {
        flex-grow: 2;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import router from '../router'
    import {FB_CLIENT_ID, FB_REDIRECT_URL} from "../env";

    export default Vue.extend({
        name: 'home',
        methods: {
            navigate() {
                router.push({name: "profile"});
            },
            login() {
                window.location.href = 'https://www.facebook.com/v2.10/dialog/oauth' +
                    `?client_id=${FB_CLIENT_ID}` +
                    `&redirect_uri=${FB_REDIRECT_URL}` +
                    '&response_type=token' +
                    '&scope=public_profile,user_friends';
            },
        },
        data: () => ({
            menuVisible: false
        })
    });
</script>
