<template>
    <div>
        <v-content>
            <ItemsBox type="Transaction"
                      :items="items"
                      @addEntity="addTransaction($event)"
                      @removeEntity="removeTransaction($event)"
                      @updateEntity="updateTransaction($event)"
                      :ownerId="this.ownerId"
                      :membersOfGroup="membersOfGroup">
                <template slot="elementBox" slot-scope="props">
                    <v-icon>account_balance</v-icon>
                    From:
                    <v-avatar size="30px">
                        <ImageOrIcon :imageUrl="props.item.from.avatar"></ImageOrIcon>
                    </v-avatar>
                    To:
                    <v-avatar size="30px">
                        <ImageOrIcon :imageUrl="props.item.to.avatar"></ImageOrIcon>
                    </v-avatar>
                </template>
            </ItemsBox>
        </v-content>
    </div>
</template>

<script>
    import {
        ADD_TRANSACTION_MUTATION,
        REMOVE_TRANSACTION_MUTATION,
        UPDATE_TRANSACTION_MUTATION,
        updateGetGroupById,
    } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';
    import ImageOrIcon from './ImageOrIcon';

    export default {
        name: 'items-box',
        data: () => ({
            dialog: '',
            fromId: '',
            toId: '',
            commentTransaction: '',
            priceTransaction: '',
        }),
        components: {
            ItemsBox, ImageOrIcon,
        },
        methods: {
            addTransaction(transaction) {
                this.$apollo.mutate({
                    mutation: ADD_TRANSACTION_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        fromId: transaction.from.id,
                        toId: transaction.to.id,
                        comment: transaction.comment,
                        price: transaction.price,
                    },
                    update: updateGetGroupById('addTransaction', 'transactions'),
                })
                    .then(() => {
                        this.dialog = false;
                        this.$emit('setSnackbar', {
                            message: 'Transaction was added successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Transaction cannot be added!',
                        operationType: 'error',
                    }));
            },

            removeTransaction(transactionId) {
                this.$apollo.mutate({
                    mutation: REMOVE_TRANSACTION_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        id: transactionId,
                    },
                    update: updateGetGroupById('removeTransaction', 'transactions'),
                })
                    .then(() => {
                        this.dialog = false;
                        this.$emit('setSnackbar', {
                            message: 'Transaction deleted successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Transaction cannot be deleted!',
                        operationType: 'error',
                    }));
            },

            updateTransaction(transaction) {
                this.$apollo.mutate({
                    mutation: UPDATE_TRANSACTION_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        id: transaction.id,
                        toId: transaction.to.id,
                        comment: transaction.comment,
                        price: transaction.price,
                    },
                    update: updateGetGroupById('updateTransaction', 'transactions'),
                })
                    .then(() => {
                        this.dialog = false;
                        this.$emit('setSnackbar', {
                            message: 'Transaction updated successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Transaction cannot be updated!',
                        operationType: 'error',
                    }));
            },
        },
        props: ['items', 'groupId', 'membersOfGroup', 'ownerId'],
    };
</script>
