<template>
    <div>
        <v-content>
            <ul v-for="item in items" class="flex-container">
                <li class="flex-item" width="100px">
                    <v-icon>{{icon}}</v-icon>
                    {{item.name}}
                </li>
            </ul>
            <ul class="flex-container">
                <li class="flex-item">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator">
                            <v-icon>add</v-icon>
                            Add {{element}}
                        </div>
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add {{element}}:
                            </v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            v-model="nameExpanse"
                                            label="Name of expanse"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="priceExpanse"
                                            label="Price of expanse"
                                            required
                                            type="float"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>


                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="addItem()">
                                    Add
                                </v-btn>
                                <v-btn color="primary" flat @click="dialog = false">
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </li>
            </ul>
        </v-content>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { ADD_EXPENSE_MUTATION, GET_PERSONS_QUERY, UPDATE_GROUP_MUTATION } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'items-box',
        data: () => ({
            friends: [],
            dialog: '',
            selectedFriends:[],
            searchInput: '',
            nameExpanse: '',
            priceExpanse:'',
        }),
        created() {

        },
        methods: {
            addItem() {
                this.$apollo.mutate({
                    mutation: ADD_EXPENSE_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        payerId: this.ownerId,
                        peopleIds: this.usersIds,
                        name: this.nameExpanse,
                        price: this.priceExpanse,
                    }

                }).then((response) => {
                    console.log(response.data.addExpanse.expenses)
                    this.items = response.data.addExpanse.expenses;

                    //this.items = response.data.updateGroup.users;
                })
            },
        },
        watch: {
            searchInput(val) {

            },
        },
        props: ['items', 'icon', 'element','groupId','usersIds','ownerId'],
    };
</script>

<style scoped>
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