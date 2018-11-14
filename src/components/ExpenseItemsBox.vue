<template>
    <div>
        <v-content>
            <ItemsBox :items="items" @removeEntity="removeExpense($event)">
                <template slot="elementBox" slot-scope="props">
                    <v-icon>add_shopping_cart</v-icon>
                    {{props.item.name}}
                </template>

                <template slot="addElementBox">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator">
                            <v-icon>add</v-icon>
                            Add expense
                        </div>
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add expense:
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

                            <v-card-text>
                                <v-flex>
                                    <v-select
                                            :items="this.membersOfGroup"
                                            v-model="selectedFriendsIds"
                                            label="Select"
                                            item-text="name"
                                            item-value="id"
                                            multiple
                                            chips
                                            max-height="auto"
                                            autocomplete
                                            size="2"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                    :selected="data.selected"
                                                    close
                                                    class="chip--select-multi"
                                                    @input="data.parent.selectItem(data.item)"
                                            >
                                                <v-avatar>
                                                    <ImageOrIcon :imageUrl="data.item.avatar"></ImageOrIcon>
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <ImageOrIcon :imageUrl="data.item.avatar"></ImageOrIcon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>
                                </v-flex>
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
    import { ADD_EXPENSE_MUTATION, updateGetGroupById } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';
    import ImageOrIcon from './ImageOrIcon';

    export default {
        name: 'items-box',
        data: () => ({
            dialog: '',
            nameExpense: '',
            priceExpense: '',
            selectedFriendsIds:[]
        }),
        components: {
            ItemsBox, ImageOrIcon
        },
        methods: {
            addItem() {
                this.$apollo.mutate({
                    mutation: ADD_EXPENSE_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        payerId: this.ownerId,
                        peopleIds: this.selectedFriendsIds,
                        name: this.nameExpense,
                        price: this.priceExpense,
                    },
                    update: updateGetGroupById('addExpense', 'expenses'),
                })
                    .then(() => {
                        this.dialog = false;
                        this.$emit('setSnackbar', {
                            message: 'Expense was added successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Expense cannot be added!',
                        operationType: 'error',
                    }));
            },

            removeExpense(expenseId) {
                console.log(expenseId);
                // this.$apollo.mutate({
                //     mutation: REMOVE_EXPENSE_MUTATION,
                //     variables: {
                //         accessToken: getAccessToken(),
                //         groupId: groupId,
                //         id: item.id
                //     },
                //     update: updateGetGroupById('removeExpense', 'expenses'),
                // })
                //     .then(() => {
                //         this.dialog = false;
                //         this.$emit('setSnackbar', {
                //             message: 'Expense deleted successfully!',
                //             operationType: 'success',
                //         });
                //     })
                //     .catch(() => this.$emit('setSnackbar', {
                //         message: 'Expense cannot be deleted!',
                //         operationType:'error'
                //     }));
            }

        },

        props: ['items', 'groupId', 'ownerId', 'membersOfGroup'],
    };
</script>

