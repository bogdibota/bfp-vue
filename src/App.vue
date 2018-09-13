<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>


<script>
    import Vue from 'vue';
    import { facebookLoginUrl, shouldRelog, getAccessToken } from './lib/facebook';


    export default Vue.extend({
        name: 'App',
        created: function () {
            const accessToken = getAccessToken();
            if (accessToken) {
                this.$store.dispatch('login_success', accessToken);
            } else if (shouldRelog()) {
                window.location = facebookLoginUrl;
            }
        },
    });
</script>
