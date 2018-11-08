<template>
    <div>
        <v-content>
            <ItemsBox :items="transactions">
                <template slot="elementBox" slot-scope="props">
                    <v-icon>account_balance</v-icon>
                    From:
                    <v-avatar size="30px">
                        <img
                                v-if="props.item.from.avatar"
                                :src="props.item.from.avatar"
                                alt="Avatar"
                        >
                    </v-avatar>
                    To:
                    <v-avatar size="30px">
                        <img
                                v-if="props.item.to.avatar"
                                :src="props.item.to.avatar"
                                alt="Avatar"
                        >
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
                                <v-flex >
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
                                                    <img :src="data.item.avatar">
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                                <v-list-tile-avatar>
                                                    <img :src="data.item.avatar">
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
                                <v-flex >
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
                                                    <img :src="data.item.avatar">
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                                <v-list-tile-avatar>
                                                    <img :src="data.item.avatar">
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
    import Vue from 'vue';
    import {
        ADD_EXPENSE_MUTATION,
        ADD_TRANSACTION_MUTATION,
        GET_PERSONS_QUERY,
        UPDATE_GROUP_MUTATION,
    } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';

    export default {
        name: 'items-box',
        data: () => ({
            dialog: '',
            fromId:'',
            toId:'',
            commentTransaction: '',
            priceTransaction:'',
            transactions:[]
        }),
        created(){
          this.transactions = this.items;
        },
        components: {
          ItemsBox
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
                    }

                }).then((response) => {
                    this.transactions = response.data.addTransaction.transactions;
                    this.dialog = false;
                    var snackbarAttributes = JSON.parse('{' + '"message"' + ':' + '"Transaction was added successfully !", "operationType":' + '"success"}');
                    this.$emit('setSnackbar', snackbarAttributes);

                }).catch((response) => {
                    var snackbarAttributes = JSON.parse('{' + '"message"' + ':' + '"Transaction cannot be added !", "operationType":' + '"error"}');
                    this.$emit('setSnackbar', snackbarAttributes);
                })
            },
        },
        props: ['items','groupId','membersOfGroup'],
    };
</script>
