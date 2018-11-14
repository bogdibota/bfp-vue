<template>
    <v-app>
        <v-content>
            <v-container fluid v-if="!$apollo.queries.group.loading">
                <Header :headerTitle="group.name"/>

                <MakeMagic :groupId="group.id"/>

                <section title="People">
                    <v-subheader><h3>People</h3></v-subheader>
                    <v-divider></v-divider>
                    <FriendsItemsBox
                            :items="group.users"
                            :groupId="groupId"
                            @setSnackbar="setSnackAttributes($event)"
                    />
                </section>

                <section title="Expenses">
                    <v-subheader><h3>Expenses</h3></v-subheader>
                    <v-divider></v-divider>
                    <ExpenseItemsBox
                            :items="group.expenses"
                            :ownerId="group.owner.id"
                            :groupId="groupId"
                            :membersOfGroup="group.users"
                            @setSnackbar="setSnackAttributes($event)"
                    />
                </section>

                <section title="Transactions">
                    <v-subheader><h3>Transactions</h3></v-subheader>
                    <v-divider></v-divider>
                    <TransactionItemsBox
                            :items="group.transactions"
                            :groupId="groupId"
                            :membersOfGroup="group.users"
                            @setSnackbar="setSnackAttributes($event)"
                    />
                </section>

                <section v-if="isAdmin()" title="Administrator">
                    <v-subheader><h3>Administrator operations</h3></v-subheader>
                    <v-divider/>
                    <AdminSection :groupId="groupId"
                                  :oldGroupName="group.name"
                                  @setSnackbar="setSnackAttributes($event)"
                    />
                </section>

                <v-snackbar
                        v-model="snackbar"
                        bottom
                        right
                        :color="snackOperation"
                        :timeout=4000
                >
                    {{snackMessage}}
                    <v-btn
                            flat
                            @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>

            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    import Header from './Header';
    import TransactionItemsBox from './TransactionItemsBox';
    import FriendsItemsBox from './FriendsItemsBox';
    import ExpenseItemsBox from './ExpenseItemsBox';
    import MakeMagic from './MakeMagic';
    import AdminSection from './AdminSection';
    import { GET_GROUP_QUERY } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'group-view',
        components: {
            Header,
            TransactionItemsBox,
            FriendsItemsBox,
            ExpenseItemsBox,
            MakeMagic,
            AdminSection,
        },
        data() {
            return {
                group: {},
                snackMessage: '',
                snackOperation: '',
                snackbar: false,
            };
        },
        apollo: {
            group: {
                query: GET_GROUP_QUERY,
                variables() {
                    return {
                        accessToken: getAccessToken(),
                        id: this.groupId,
                    };
                },
                update: ({ groupById }) => groupById,
            },
        },
        methods: {
            isAdmin() {
                return this.$store.state.user.userId === this.group.owner.id;
            },
            setSnackAttributes(snack) {
                this.snackbar = true;
                this.snackMessage = snack.message;
                this.snackOperation = snack.operationType;
            },
        },
        computed: {
            groupId() {
                return this.$route.params.groupId;
            },
            userIds() {
                return this.group.users.map(({ id }) => id);
            },
        },
    };
</script>