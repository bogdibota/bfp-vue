<template>
    <div>
        <v-content>
            <ItemsBox :items="items" @removeEntity="removeTransaction($event)" :ownerId="this.ownerId">
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

                <template slot="addElementBox">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator">
                            <v-icon>add</v-icon>
                            Add transaction
                        </div>
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add transaction:
                            </v-card-title>
                            <v-card-text>
                                <v-flex>
                                    <v-select
                                            :items="this.membersOfGroup"
                                            v-model="fromId"
                                            label="From"
                                            item-text="name"
                                            item-value="id"
                                            chips
                                            max-height="auto"
                                            autocomplete
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                    :selected="data.selected"
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
                                                    <v-list-tile-sub-title
                                                            v-html="data.item.group"></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                        </template>
                                    </v-select>
                                </v-flex>
                            </v-card-text>

                            <v-card-text>
                                <v-flex>
                                    <v-select
                                            :items="this.membersOfGroup"
                                            v-model="toId"
                                            label="To"
                                            item-text="name"
                                            item-value="id"
                                            chips
                                            max-height="auto"
                                            autocomplete
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                    :selected="data.selected"
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
                                                    <v-list-tile-sub-title
                                                            v-html="data.item.group"></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                        </template>
                                    </v-select>
                                </v-flex>
                            </v-card-text>

                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            v-model="commentTransaction"
                                            label="Name of transaction"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="priceTransaction"
                                            label="Price of transaction"
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
    import { ADD_TRANSACTION_MUTATION, REMOVE_TRANSACTION_MUTATION, updateGetGroupById } from '../apollo/graphql';
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
            ItemsBox, ImageOrIcon
        },
        methods: {
            addItem() {
                this.$apollo.mutate({
                    mutation: ADD_TRANSACTION_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                        fromId: this.fromId,
                        toId: this.toId,
                        comment: this.commentTransaction,
                        price: this.priceTransaction,
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
                        id: transactionId
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
                        operationType:'error'
                    }));
            }
        },
        props: ['items', 'groupId', 'membersOfGroup','ownerId'],
    };
</script>
