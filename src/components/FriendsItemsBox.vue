<template>
    <v-content>
        <v-container fluid v-if="!$apollo.queries.friends.loading">
            <ItemsBox :items="items" @removeEntity="removeUser($event)" :ownerId="this.ownerId">
                <template slot="elementBox" slot-scope="props">
                    <v-avatar size="45px">
                        <ImageOrIcon :imageUrl="props.item.avatar"></ImageOrIcon>
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
        </v-container>
    </v-content>
</template>

<script>
    import { GET_PERSONS_QUERY, UPDATE_GROUP_MUTATION, updateGetGroupById } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ItemsBox from './ItemsBox';
    import ImageOrIcon from './ImageOrIcon';

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
                variables() {
                    return {
                        accessToken: getAccessToken(),
                        excludeGroupId: this.groupId
                    }
                },
                update: ({ myFriends }) => myFriends,
            },
        },
        components: {
            ItemsBox, ImageOrIcon
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
                            update: updateGetGroupById('updateGroup', 'users'),
                        })
                            .then(() => {
                                this.dialog = false;
                                this.$emit('setSnackbar', {
                                    message: 'User was added successfully!',
                                    operationType: 'success',
                                });
                            })
                            .catch(() => this.$emit('setSnackbar', {
                                message: 'User cannot be added!',
                                operationType: 'error',
                            }));
                    },
                );
            },

            removeUser(userId) {
                this.$apollo.mutate({
                    mutation: UPDATE_GROUP_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        id: this.groupId,
                        removeUserId: userId,
                    },
                    update: updateGetGroupById('updateGroup', 'users'),
                })
                    .then(() => {
                        this.dialog = false;
                        this.$emit('setSnackbar', {
                            message: 'User was removed successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'User cannot be removed!',
                        operationType: 'error',
                    }));
            },
        },
        props: ['items', 'groupId','ownerId'],
    };
</script>

