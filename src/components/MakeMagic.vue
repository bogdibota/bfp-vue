<template>
    <v-dialog v-model="dialog" width="500">
        <v-btn slot="activator" @click="makeMagic()">Make magic</v-btn>
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Magic pool result
            </v-card-title>

            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex d-flex xs12 sm6 md6>
                            <v-list two-line>
                                <h3>Give money</h3>
                                <template v-for="userStatus in  usersStatuses">
                                    <v-list-tile v-if="userStatus.status<0">
                                        <v-list-tile-avatar>
                                            <ImageOrIcon :imageUrl="userStatus.user.avatar"/>
                                        </v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-title
                                                    v-html="userStatus.user.name"></v-list-tile-title>
                                            <v-list-tile-sub-title class="text-red"
                                                                   v-html="userStatus.status"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </template>
                            </v-list>
                        </v-flex>
                        <v-flex d-flex xs12 sm6 md6>
                            <v-list two-line>
                                <h3>Receive money</h3>
                                <template v-for="(userStatus, index) in  usersStatuses">
                                    <v-list-tile v-if="userStatus.status>0">
                                        <v-list-tile-avatar>
                                            <ImageOrIcon :imageUrl="userStatus.user.avatar"/>
                                        </v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-title
                                                    v-html="userStatus.user.name"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="userStatus.status"
                                                                   class="text-green"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </template>
                            </v-list>
                        </v-flex>

                        <v-flex d-flex xs12 sm12 md12>
                            <v-card v-if="showProtip">
                                <v-icon style="float: left" @click="showProtip = false">clear</v-icon>
                                <v-card-text class="protip">
                                    To keep track of this, you can
                                    create transactions and this dialog will be updated.
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>

                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import ImageOrIcon from './ImageOrIcon';
    import { MAKE_MAGIC_QUERY } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'make-magic',
        props: ['groupId'],
        data() {
            return {
                dialog: false,
                usersStatuses: [],
                showProtip: true,
            };
        },
        components: {
            ImageOrIcon
        },
        methods: {
            makeMagic() {
                this.$apollo.query({
                    query: MAKE_MAGIC_QUERY,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                    },
                    fetchPolicy: 'no-cache',
                })
                    .then(({ data: { makeMagic: { pool } } }) => this.usersStatuses = pool);
            },
        },
    };
</script>

<style scoped>
    .text-green
    {
        color: green;
    }

    .text-red
    {
        color: red;
    }

    .protip
    {
        color: gray;
        font-style: italic;
    }
</style>
