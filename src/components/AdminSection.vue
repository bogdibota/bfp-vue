<template>
    <v-layout row justify-center>
        <v-btn @click="dialogDelete = true">
            Delete group
        </v-btn>

        <v-dialog v-model="dialogDelete" max-width="290">
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete the group ?</v-card-title>

                <v-card-text>
                    Deleting the group will cause all information regarding the group to be lost.
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat="flat" @click="deleteGroup()">
                        Delete
                    </v-btn>
                    <v-btn color="primary" flat="flat" @click="dialogDelete = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


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
        updateGetAllGroups,
    } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'admin-section',
        data() {
            return {
                dialogDelete: false,
                dialogRename: false,
                newGroupName: this.oldGroupName,
            };
        },
        props: ['groupId', 'index', 'oldGroupName'],
        methods: {
            deleteGroup() {
                this.$apollo.mutate({
                    mutation: DELETE_GROUP_MUTATION,
                    variables: {
                        accessToken: getAccessToken(),
                        groupId: this.groupId,
                    },
                    update: updateGetAllGroups('removeGroup', this.index),
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

<style scoped>

</style>

