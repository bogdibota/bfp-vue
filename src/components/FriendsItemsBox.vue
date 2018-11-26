<template>

    <v-container>
        <v-content>
            <ItemsBox type="User"
                      :items="items"
                      :success="success"
                      @addEntity="addUsers($event)"
                      @removeEntity="removeUser($event)"
                      :ownerId="this.ownerId"
                      :membersOfGroup="friends">
                <template slot="elementBox" slot-scope="props">
                    <v-avatar size="45px">
                        <ImageOrIcon :imageUrl="props.item.avatar"></ImageOrIcon>
                    </v-avatar>
                    {{props.item.name}}
                </template>
            </ItemsBox>
        </v-content>
    </v-container>
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
            selectedFriendsIds: [],
            searchInput: '',
            name: '',
            success: 0,
        }),
        props: ['items', 'groupId', 'ownerId'],
        apollo: {
            friends: {
                query: GET_PERSONS_QUERY,
                variables() {
                    return {
                        accessToken: getAccessToken(),
                        excludeGroupId: this.groupId,
                    };
                },
                update: ({ myFriends }) => myFriends,
            },
        },
        components: {
            ItemsBox, ImageOrIcon,
        },
        methods: {
            addUsers(item) {
                item['null'].forEach(friend => {
                    this.$apollo.mutate({
                        mutation: UPDATE_GROUP_MUTATION,
                        variables: {
                            accessToken: getAccessToken(),
                            id: this.groupId,
                            addUserId: friend.id,
                        },
                        update: updateGetGroupById('updateGroup', 'users'),
                    })
                        .then(() => {
                            this.$emit('setSnackbar', {
                                message: 'User was added successfully!',
                                operationType: 'success',
                            });

                            this.getFriends();
                            this.success += 1;
                        })
                        .catch(() => {
                            this.$emit('setSnackbar', {
                                message: 'User cannot be added!',
                                operationType: 'error',
                            });
                        });
                });
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
                        this.$emit('setSnackbar', {
                            message: 'User was removed successfully!',
                            operationType: 'success',
                        });

                        this.getFriends();
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'User cannot be removed!',
                        operationType: 'error',
                    }));
            },

            getFriends() {
                this.$apollo.queries.friends.fetchMore({
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        this.friends = fetchMoreResult.myFriends;
                    },
                });
            },
        },
    };
</script>

