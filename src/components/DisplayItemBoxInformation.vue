<template>
    <v-dialog v-model="dialog" width="500">
        <div slot="activator">
            <v-icon size="25px">info</v-icon>
        </div>
        <v-card>
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                {{item.__typename}} information:
            </v-card-title>

            <v-list two-line>

                <template v-for="field in displayInformation">
                    <div class="content">
                        <v-list-tile-content v-if="field.type==='string'">
                            <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item[field.fieldName]"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-content v-else-if="field.type==='date'">
                            <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="getDate(item[field.fieldName])"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-content class="avatar" v-else-if="field.type==='avatar'">
                            <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                            <UserCard v-if="field.fieldName" :user="item[field.fieldName]"></UserCard>
                            <UserCard v-else :user="item"></UserCard>
                        </v-list-tile-content>

                        <v-list-tile-content v-else-if="field.type==='avatarList'">
                            <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-container fluid grid-list-md>
                                    <v-layout row wrap>
                                        <v-avatar v-for="user in item[field.fieldName]" class="avatarList">
                                            <v-flex d-flex xs3 sm3 md2>
                                                <ImageOrIcon :imageUrl="user.avatar"></ImageOrIcon>
                                            </v-flex>
                                        </v-avatar>
                                    </v-layout>
                                </v-container>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </div>
                    <v-divider></v-divider>
                </template>

            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="canUpdateOrDelete" color="primary" flat @click="$refs.deleteConfirmationDialog.open()">
                    Delete
                </v-btn>

                <ConfirmationDialog
                        ref="deleteConfirmationDialog"
                        :title="'Delete '+item.__typename "
                        :message="'Are you sure you want to delete this '+item.__typename+ '?'"
                        @confirm="deleteConfirmation()"
                ></ConfirmationDialog>


                <v-btn color="primary" flat @click="dialog = false">
                    Close
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import ImageOrIcon from './ImageOrIcon';
    import ConfirmationDialog from './ConfirmationDialog';
    import UserCard from './UserCard';

    export default {

        name: 'display-item-box-information',
        props: ['item', 'displayInformation','canUpdateOrDelete'],

        data: () => ({
            dialog: '',
        }),
        components: {
            ImageOrIcon, UserCard, ConfirmationDialog,
        },
        methods: {
            getDate(dateFloat) {
                const date = new Date(dateFloat);
                return date.toDateString();
            },
            deleteConfirmation() {
                this.dialog = false;
                this.$emit('removeEntity',this.item.id);
            }
        },
    };
</script>

<style scoped>
    .content {
        margin: 20px;
    }

    .avatarList {
        margin: 2px;
    }

    .avatar {
        align-items: center;
    }
</style>