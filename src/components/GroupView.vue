<template>
    <v-content>
        <v-container fluid>
            <Header v-bind:headerTitle="groupName"/>
            <section title="People">
                <v-subheader><h3>People</h3></v-subheader>
                <v-divider></v-divider>
                <ItemsBox v-bind:items="getUsers()" v-bind:icon="'person'" v-bind:element="'person'"/>
            </section>

            <section title="Expanses">
                <v-subheader><h3>Expanses</h3></v-subheader>
                <v-divider></v-divider>
                <ItemsBox v-bind:items="getExpanses()" v-bind:icon="'add_shopping_cart'" v-bind:element="'expanse'"/>
            </section>

            <section title="Transactions">
                <v-subheader><h3>Transactions</h3></v-subheader>
                <v-divider></v-divider>
                <ItemsBox v-bind:items="getTransactions()" v-bind:icon="'account_balance'"
                          v-bind:element="'transaction'"/>
            </section>
        </v-container>
    </v-content>
</template>

<script>
    import Vue from 'vue';
    import Header from './Header';
    import ItemsBox from './ItemsBox';
    import { GET_PERSONS_FROM_GROUP_QUERY } from '../apollo/graphql';
    import { GET_GROUP_QUERY } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';


    export default {
        name: 'group-view',
        data() {
            return {
                groupName: '',
                groupId: '',
                persons: ['sarah', 'george', 'ana'],
                expanses: ['e1', 'e2', 'e3'],
                transactions: ['t1', 't2', 't3'],
            };
        },
        created() {
            this.groupName = this.$route.params.groupName;
            this.groupId = this.$route.params.groupId;
            this.group = this.$apollo.query({
                query: GET_GROUP_QUERY,
                variables: {
                    accessToken: getAccessToken(),
                    id: this.groupId,
                },
            });
        },
        components: {
            Header,
            ItemsBox,
        },
        methods: {
            getUsers() {
                return this.group.users;
            },
            getExpanses() {
                return this.group.expanses;
            },
            getTransactions() {
                return this.group.transactions;
            },
        },

    };
</script>

<style scoped>

</style>