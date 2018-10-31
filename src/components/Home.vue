<template>
    <v-app id="inspire">
        <Header :headerTitle="'BFS'"/>
        <v-content>
            <v-container fluid>

            </v-container>
        </v-content>
    </v-app>
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

<script>
    import Vue from 'vue';
    import Header from './Header'

    export default Vue.extend({
        name: 'home',
        components:{
            Header
        },
    });
</script>
