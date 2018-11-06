<template>
    <div>
        <v-content>
            <ItemsBox :items="items">
                <template slot="elementBox" slot-scope="props">
                    <v-icon>add_shopping_cart</v-icon>
                    {{props.item.name}}
                </template>

                <template slot="addElementBox">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator">
                            <v-icon>add</v-icon>
                            Add expanse
                        </div>
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add expanse:
                            </v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            v-model="nameExpense"
                                            label="Name of expense"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="priceExpense"
                                            label="Price of expense"
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
                </template>
            </ItemsBox>
        </v-content>
    </div>
</template>

<script>
    import { ADD_EXPENSE_MUTATION, GET_PERSONS_QUERY, UPDATE_GROUP_MUTATION } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';

    export default {
        name: 'items-box',
        data: () => ({
            dialog: '',
            nameExpense: '',
            priceExpense:'',
        }),
        components: {
          ItemsBox
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
                        name: this.nameExpense,
                        price: this.priceExpense,
                    }
                }).then((response) => {
                    this.items = response.data.addExpense.expenses;
                })
            },
        },
        props: ['items','groupId','usersIds','ownerId'],
    };
</script>

