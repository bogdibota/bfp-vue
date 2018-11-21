<template>
    <div>
        <v-content>
            <ItemsBox :items="items"
                      type="Expense"
                      @addEntity="addExpense($event)"
                      @removeEntity="removeExpense($event)"
                      @updateEntity="updateEntity($event)"
                      :success="success"
                      :ownerId="this.ownerId"
                      :membersOfGroup="this.membersOfGroup">
                <template slot="elementBox" slot-scope="props">
                    <v-icon>add_shopping_cart</v-icon>
                    {{props.item.name}}
                </template>
            </ItemsBox>
        </v-content>
    </div>
</template>

<script>
    import {
        ADD_EXPENSE_MUTATION,
        REMOVE_EXPENSE_MUTATION,
        UPDATE_EXPENSE_MUTATION,
        updateGetGroupById,
    } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';
    import ImageOrIcon from './ImageOrIcon';

    export default {
        name: 'items-box',
        data: () => ({
            nameExpense: '',
            priceExpense: '',
            selectedFriendsIds: [],
            success:0,
        }),
        props: ['items', 'groupId', 'ownerId', 'membersOfGroup'],
        components: {
            ItemsBox, ImageOrIcon,
        },
        methods: {
            addExpense(expense) {
                this.$apollo.mutate({
                    mutation: ADD_EXPENSE_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        payerId: this.$store.state.user.userId,
                        peopleIds: expense.people.map(user => user.id),
                        name: expense.name,
                        price: expense.price,
                    },
                    update: updateGetGroupById('addExpense', 'expenses'),
                })
                    .then(() => {
                        this.$emit('setSnackbar', {
                            message: 'Expense was added successfully!',
                            operationType: 'success',
                        });
                        this.success+=1;
                    })
                    .catch(() => {
                        this.$emit('setSnackbar', {
                            message: 'Expense cannot be added!',
                            operationType: 'error',
                        })
                        this.success=0;
                    });
            },

            removeExpense(expenseId) {
                this.$apollo.mutate({
                    mutation: REMOVE_EXPENSE_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        id: expenseId,
                    },
                    update: updateGetGroupById('removeExpense', 'expenses'),
                })
                    .then(() => {
                        this.$emit('setSnackbar', {
                            message: 'Expense deleted successfully!',
                            operationType: 'success',
                        });

                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Expense cannot be deleted!',
                        operationType: 'error',
                    }));
            },

            updateEntity(expense) {
                this.$apollo.mutate({
                    mutation: UPDATE_EXPENSE_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        id: expense.id,
                        peopleIds: expense.people.map(x => x.id),
                        name: expense.name,
                        price: expense.price,
                    },
                    update: updateGetGroupById('updateExpense', 'expenses'),
                })
                    .then(() => {
                        this.$emit('setSnackbar', {
                            message: 'Expense updated successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Expense cannot be updated!',
                        operationType: 'error',
                    }));
            },

        },
    };
</script>

