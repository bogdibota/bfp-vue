<template>
    <v-app>
        <v-content>
            <v-container fluid v-if="!$apollo.queries.group.loading">
                <Header :headerTitle="group.name"/>

                <MakeMagic :groupId="group.id"/>
                <v-expansion-panel v-model="panel" expand>
                    <v-expansion-panel-content>
                        <div slot="header"><h3>Group information</h3></div>
                        <GroupInformation :groupOwner="group.owner"/>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header"><h3>People</h3></div>
                        <FriendsItemsBox
                                :items="group.users"
                                :ownerId="group.owner.id"
                                :groupId="groupId"
                                @setSnackbar="setSnackAttributes($event)"
                        />
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header"><h3>Expenses</h3></div>
                        <ExpenseItemsBox
                                :items="group.expenses"
                                :ownerId="group.owner.id"
                                :groupId="groupId"
                                :membersOfGroup="group.users"
                                @setSnackbar="setSnackAttributes($event)"
                        />
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <div slot="header"><h3>Transactions</h3></div>
                        <TransactionItemsBox
                                :items="group.transactions"
                                :groupId="groupId"
                                :ownerId="group.owner.id"
                                :membersOfGroup="group.users"
                                @setSnackbar="setSnackAttributes($event)"
                        />
                    </v-expansion-panel-content>
                    <v-divider></v-divider>
                    <v-expansion-panel-content v-if="isAdmin()">
                        <div slot="header"><h3>Administrator operations</h3></div>
                        <AdminSection :groupId="groupId"
                                      :oldGroupName="group.name"
                                      @setSnackbar="setSnackAttributes($event)"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>


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
    import GroupInformation from './GroupInformation';
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
            GroupInformation,
        },
        data() {
            return {
                group: {},
                snackMessage: '',
                snackOperation: '',
                snackbar: false,
                panel: [],
            };
        },
        mounted() {
            if (window.innerWidth < 425) {
                this.panel = [true, false, false, false];
            }
            else {
                this.panel = [true, true, true, true];
            }
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

