<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <Header v-bind:headerTitle="this.group.name"/>
                <section title="People">
                    <v-subheader><h3>People</h3></v-subheader>
                    <v-divider></v-divider>
                    <FriendsItemsBox :items="this.group.users" :groupId="this.groupId"/>
                </section>
                <v-space></v-space>
                <section title="Expenses">
                    <v-subheader><h3>Expenses</h3></v-subheader>
                    <v-divider></v-divider>
                    <ExpenseItemsBox :items="this.group.expenses" :usersIds="getUsersIds()"
                                     :ownerId="this.group.owner.id"
                                     :groupId="this.groupId"/>
                </section>
                <v-space></v-space>
                <section title="Transactions">
                    <v-subheader><h3>Transactions</h3></v-subheader>
                    <v-divider></v-divider>
                    <TransactionItemsBox :items="this.group.transactions" :groupId="this.groupId"
                                         :membersOfGroup="this.group.users"/>
                </section>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    import Header from './Header';
    import TransactionItemsBox from './TransactionItemsBox';
    import FriendsItemsBox from './FriendsItemsBox';
    import ExpenseItemsBox from './ExpenseItemsBox';
    import { GET_GROUP_QUERY } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'group-view',
        data() {
            return {
                groupName: '',
                groupId: '',
                group: '',
                ids: [],
            };
        },
        created() {
            this.groupName = this.$route.params.groupName;
            this.groupId = this.$route.params.groupId;

            this.$apollo.query({
                query: GET_GROUP_QUERY,
                variables: {
                    accessToken: getAccessToken(),
                    id: this.groupId,
                },
            }).then(((response) => {
                this.group = response.data.groupById;
            }));
        },
        components: {
            Header,
            TransactionItemsBox,
            FriendsItemsBox,
            ExpenseItemsBox,
        },
        methods: {
            getUsersIds() {
                var ids = [];
                this.group.users.forEach(function (item) {
                    ids.push(item.id);
                });
                return ids;
            },
        },
    };
</script>