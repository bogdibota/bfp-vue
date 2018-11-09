<template>
    <div>
        <v-content>
            <ItemsBox :items="items">
                <template slot="elementBox" slot-scope="props">

                    <v-avatar size="45px">
                        <img
                                v-if="!props.item.avatar.includes('scontent')"
                                :src="props.item.avatar"
                                alt="Avatar"
                        >
                        <v-icon v-else>person</v-icon>
                    </v-avatar>
                    {{props.item.name}}
                </template>

                <template slot="addElementBox">
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator">
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
                                                    <img v-if="!data.item.avatar.includes('scontent')"
                                                         :src="data.item.avatar">
                                                    <v-icon v-else>person</v-icon>
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <img v-if="!data.item.avatar.includes('scontent')"
                                                     :src="data.item.avatar">
                                                <v-icon v-else>person</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-select>
                                </v-flex>
                            </v-card-text>

                            <v-card-actions>
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
    import { GET_GROUP_QUERY, GET_PERSONS_QUERY, UPDATE_GROUP_MUTATION } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';

    export default {
        name: 'items-box',
        data: () => ({
            friends: [],
            dialog: '',
            selectedFriendsIds: [],
            searchInput: '',
            name: '',
        }),
        apollo: {
            friends: {
                query: GET_PERSONS_QUERY,
                variables: {
                    accessToken: getAccessToken(),
                },
                update: ({myFriends}) => myFriends,

            },
        },
        components: {
            ItemsBox,
        },
        methods: {
            addItem() {
                this.selectedFriendsIds.forEach(friendId => {
                        this.$apollo.mutate({
                            mutation: UPDATE_GROUP_MUTATION,
                            variables: {
                                accessToken: getAccessToken(),
                                id: this.groupId,
                                addUserId: friendId,
                            },
                            update: (store, { data: { updateGroup } }) => {
                                const variables = { accessToken: getAccessToken(), id: updateGroup.id };
                                const data = store.readQuery({
                                    query: GET_GROUP_QUERY,
                                    variables,
                                });

                                data.groupById.users = updateGroup.users;

                                store.writeQuery({
                                    query: GET_GROUP_QUERY,
                                    variables,
                                    data,
                                });
                            },
                        });
                    },
                );
            },
        },
        props: ['items', 'groupId'],
    };
</script>

