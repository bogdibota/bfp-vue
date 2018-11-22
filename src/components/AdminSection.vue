<template>
    <v-layout row justify-center>
        <v-btn @click="$refs.deleteConfirmationDialog.open()">
            Delete group
        </v-btn>

        <ConfirmationDialog
                ref="deleteConfirmationDialog"
                :title="'Delete group'"
                :message="'Are you sure you want to delete this group ?'"
                @confirm="deleteGroup()"
        ></ConfirmationDialog>

        <v-btn @click="dialogRename = true">
            Rename group
        </v-btn>

        <v-dialog v-model="dialogRename" max-width="290">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Rename group:
                </v-card-title>

                <v-card-text>
                    <v-form>
                        <v-text-field v-model="newGroupName" required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat="flat" @click="renameGroup()">
                        Rename
                    </v-btn>
                    <v-btn color="primary" flat="flat" @click="dialogRename = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>
</template>

<script>
    import {
        DELETE_GROUP_MUTATION,
        UPDATE_GROUP_MUTATION,
        updateGetGroupById,
        updateGetAllGroups, ALL_GROUPS_QUERY,
    } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';
    import ConfirmationDialog from './ConfirmationDialog';

    export default {
        name: 'admin-section',
        props: ['groupId', 'oldGroupName'],
        components: {
          ConfirmationDialog
        },
        data() {
            return {
                dialogDelete: false,
                dialogRename: false,
                newGroupName: this.oldGroupName,
            };
        },

        methods: {
            deleteGroup() {
                this.$apollo.mutate({
                    mutation: DELETE_GROUP_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                    },
                    update: (store) => {
                        const variables = { accessToken: getAccessToken() };
                        const cachedData = store.readQuery({
                            query: ALL_GROUPS_QUERY,
                            variables,
                        });

                        cachedData.myGroups = cachedData.myGroups.filter(({ id }) => id !== this.groupId);

                        store.writeQuery({
                            query: ALL_GROUPS_QUERY,
                            variables,
                            data: cachedData,
                        });
                    },
                })
                    .then(() => {
                        this.$router.push({ name: 'groups' });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Group cannot be deleted!',
                        operationType: 'error',
                    }));
            },
            renameGroup() {
                this.$apollo.mutate({
                    mutation: UPDATE_GROUP_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        id: this.groupId,
                        name: this.newGroupName,
                    },
                    update: updateGetGroupById('updateGroup', 'name'),
                })
                    .then(() => {
                        this.dialogRename = false;
                        this.$emit('setSnackbar', {
                            message: 'Group renamed successfully!',
                            operationType: 'success',
                        });
                    })
                    .catch(() => this.$emit('setSnackbar', {
                        message: 'Group cannot be renamed!',
                        operationType: 'error',
                    }));
            },
        },
    };
</script>



