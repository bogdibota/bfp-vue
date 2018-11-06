<template>
    <div>
        <v-content>
            <ItemsBox :items="items">
                <template slot="elementBox" slot-scope="props">
                    <v-avatar size="45px">
                        <img
                                v-if="props.item.avatar"
                                :src="props.item.avatar"
                                alt="Avatar"
                        >
                    </v-avatar>
                    {{props.item.name}}
                </template>

                <template slot="addElementBox">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator" @click="loadFriends()">
                            <v-icon>add</v-icon>
                            Add member
                        </div>

                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add member:
                            </v-card-title>
                            <v-card-text>
                                <v-flex>
                                    <v-select
                                            :items="friends"
                                            v-model="selectedFriends"
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
    import { GET_PERSONS_QUERY, UPDATE_GROUP_MUTATION } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';

    export default {
        name: 'items-box',
        data: () => ({
            friends: [],
            dialog: '',
            selectedFriends: [],
            searchInput: '',
            name: '',
        }),
        components: {
            ItemsBox,
        },
        methods: {
            loadFriends() {
                this.$apollo.query({
                    query: GET_PERSONS_QUERY,
                    variables: {
                        accessToken: getAccessToken(),
                    },
                }).then((response) => {

                    this.friends = response.data.myFriends;
                });
            },
            addItem() {
                this.selectedFriends.forEach(function (item) {
                        this.$apollo.mutate({
                            mutation: UPDATE_GROUP_MUTATION,
                            variables: {
                                accessToken: getAccessToken(),
                                id: this.groupId,
                                addUserId: item,
                            },
                        }).then((response) => {
                            this.items = response.data.updateGroup.users;
                        });
                    },
                );
            },
        },
        props: ['items', 'groupId'],
    };
</script>

