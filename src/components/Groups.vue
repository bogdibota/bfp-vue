<template>
    <v-app id="inspire">
        <Header v-bind:headerTitle="'My groups'"/>
        <v-content>
            <v-container fluid>
                <div>
                    <ul v-for="group in myGroups" class="flex-container">
                        <li class="flex-item" @click="navigate('group-view', group.id)">
                            <v-icon>group</v-icon>
                            {{group.name}}
                        </li>
                    </ul>
                    <ul class="flex-container">
                        <li class="flex-item">
                            <v-dialog v-model="dialog" width="500">
                                <div slot="activator">
                                    <v-icon>add</v-icon>
                                    Add group
                                </div>

                                <v-card>
                                    <v-card-title
                                            class="headline grey lighten-2"
                                            primary-title>
                                        Add group:
                                    </v-card-title>

                                    <v-card-text>
                                        <v-text-field type="text" v-model="groupName" placeholder="Group name"/>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                color="primary"
                                                flat
                                                @click="addGroup()"
                                        >
                                            Add
                                        </v-btn>
                                        <v-btn
                                                color="primary"
                                                flat
                                                @click="dialog = false "
                                        >
                                            Close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </li>

                    </ul>
                </div>
            </v-container>

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

    .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: inline-flex;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .flex-item {
        background: #b3d4fc;
        padding: 5px;
        width: 200px;
        height: 150px;
        margin: 10px;
        line-height: 150px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .flex-item:hover {
        background: darkblue;
        cursor: pointer
    }

    .modal-open {
        padding: 0px;
    }

</style>

<script>
    import Vue from 'vue';
    import Header from './Header';
    import { ALL_GROUPS_QUERY } from '../apollo/graphql';
    import { CREATE_GROUP_MUTATION } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';


    export default Vue.extend({
        name: 'home',

        components: {
            Header,
        },
        data() {
            return {
                myGroups: [],
                dialog: '',
                groupName: '',
                snackbar: false,
                snackMessage: '',
                snackOperation: '',
            };
        },
        apollo: {
            myGroups: {
                query: ALL_GROUPS_QUERY,
                variables: {
                    accessToken: getAccessToken(),
                },
            },
        },
        methods: {
            navigate(to, groupId) {
                this.$router.push({ name: to, params: { groupId: groupId } });
            },
            addGroup() {
                this.$apollo.mutate({
                    mutation: CREATE_GROUP_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        name: this.groupName,
                    },
                    update: (store, { data: { addGroup } }) => {
                        const data = store.readQuery({ query: ALL_GROUPS_QUERY });
                        data.push(addGroup);
                        store.writeQuery({ query: ALL_GROUPS_QUERY, data });

                        const allGroupsQuery = {
                            query: ALL_GROUPS_QUERY,
                            variables: { accessToken: getAccessToken() },
                        };

                        const allGroupsData = store.readQuery(allGroupsQuery);
                        allGroupsData.myGroups.push(addGroup);
                        store.writeQuery({ ...allGroupsQuery, data: allGroupsData });
                    },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        createGroup: {
                            id: null,
                            __typename: 'Group',
                            name: this.groupName,
                            accessToken: getAccessToken(),
                        },
                    },

                }).then((data) => {
                    this.dialog = false;
                    this.snackbar = true;
                    this.snackOperation = 'success';
                    this.snackMessage = 'Group added successfully !';

                }).catch((error) => {
                    this.snackbar = true;
                    this.snackOperation = 'error';
                    this.snackMessage = 'Group cannot be added !';
                });
            },
        },

    });
</script>


