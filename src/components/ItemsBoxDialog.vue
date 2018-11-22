<template>
    <v-dialog v-model="dialog" width="500">

        <v-card>
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                {{title}}
            </v-card-title>

            <v-list two-line>
                <v-form ref="form">
                    <template v-for="field in displayInformation">
                        <div class="content">
                            <v-list-tile-content v-if="field.type==='string'">
                                <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                                <v-text-field v-if="!addition" v-model="item[field.fieldName]"
                                              :disabled="disabled"></v-text-field>
                                <v-text-field v-else v-model="item[field.fieldName]"
                                              :label="'Enter '+field.fieldName+' here'"
                                              autofocus></v-text-field>
                            </v-list-tile-content>

                            <v-list-tile-content v-else-if="field.type==='date'">
                                <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="getDate(item[field.fieldName])"></v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-content class="avatar" v-else-if="field.type==='avatar'">
                                <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                                <div v-if="(!addition) ||  field.displayText==='Payer'">
                                    <UserCard v-if="(field.fieldName)" :user="item[field.fieldName]"></UserCard>
                                    <UserCard v-else :user="item"></UserCard>
                                </div>

                                <v-card-text>
                                    <v-flex>
                                        <SelectUsers
                                                ref="selectMultiple"
                                                :show="(!disabled & field.displayText==='To:') || (addition & field.displayText!=='Payer')"
                                                :items="listOfFriends"
                                                :label="selectionLabel(field.fieldName)"
                                                :model="item[field.fieldName]"
                                                :multiple="field.displayText===null"
                                                @change="updateField(field,$event)"
                                        />
                                    </v-flex>
                                </v-card-text>
                            </v-list-tile-content>

                            <v-list-tile-content v-else-if="field.type==='avatarList'">
                                <v-list-tile-title v-html="field.displayText"></v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-container v-if="!addition" fluid grid-list-md>
                                        <v-layout row wrap>
                                            <v-avatar v-for="user in item[field.fieldName]" class="avatarList">
                                                <v-flex d-flex xs3 sm3 md2>
                                                    <ImageOrIcon :imageUrl="user.avatar"></ImageOrIcon>
                                                </v-flex>
                                            </v-avatar>
                                        </v-layout>
                                    </v-container>
                                    <v-card-text>
                                        <v-flex>
                                            <SelectUsers ref="selectSingle"
                                                         :show="!disabled || addition"
                                                         :items="listOfFriends"
                                                         :label="selectionLabel(field.fieldName)"
                                                         :model="item[field.fieldName]"
                                                         :multiple="true"
                                                         @change="updateField(field,$event)"
                                            />
                                        </v-flex>
                                    </v-card-text>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </div>

                        <v-divider></v-divider>
                    </template>
                </v-form>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn v-if="addition" color="primary" flat @click=" $refs.addConfirmationDialog.open()">
                    Add
                </v-btn>

                <v-btn v-if="canUpdateOrDelete & disabled & item.__typename!=='User'"
                       color="primary" flat
                       @click="disabled = false">
                    Update
                </v-btn>
                <v-btn v-if="!disabled" color="primary" flat
                       @click="$refs.updateConfirmationDialog.open()">
                    Confirm update
                </v-btn>

                <v-btn v-if="canUpdateOrDelete" color="primary" flat @click="$refs.deleteConfirmationDialog.open()">
                    Delete
                </v-btn>

                <v-btn color="primary" flat @click=" dialog = false ">
                    Close
                </v-btn>

                <ConfirmationDialog
                        ref="addConfirmationDialog"
                        :title="'Add ' + item.__typename"
                        :message="'Are you sure you want to add this '+item.__typename+ '?'"
                        @confirm="addConfirmation()"
                ></ConfirmationDialog>

                <ConfirmationDialog
                        ref="updateConfirmationDialog"
                        :title="'Update ' + item.__typename"
                        :message="'Are you sure you want to update this '+item.__typename+ '?'"
                        @confirm="updateConfirmation()"
                ></ConfirmationDialog>

                <ConfirmationDialog
                        ref="deleteConfirmationDialog"
                        :title="'Delete '+item.__typename "
                        :message="'Are you sure you want to delete this '+item.__typename+ '?'"
                        @confirm="deleteConfirmation()"
                ></ConfirmationDialog>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import ImageOrIcon from './ImageOrIcon';
    import ConfirmationDialog from './ConfirmationDialog';
    import UserCard from './UserCard';
    import SelectUsers from './SelectUsers';

    export default {

        name: 'display-item-box-information',
        props: ['item', 'displayInformation', 'canUpdateOrDelete', 'listOfFriends', 'addition', 'title', 'success'],

        data: () => ({
            dialog: false,
            disabled: true,
        }),
        components: {
            ImageOrIcon, UserCard, ConfirmationDialog, SelectUsers,
        },
        watch: {
            success: function () {
                this.$refs.form.reset();
                this.dialog = false;
            },
        },
        methods: {
            updateField(field, users) {
                this.item[field.fieldName] = users;
            },
            open() {
                this.dialog = true;
            },
            getDate(dateFloat) {
                if (dateFloat === '') {
                    return new Date().toDateString();
                }
                const date = new Date(dateFloat);
                return date.toDateString();
            },
            deleteConfirmation() {
                this.dialog = false;
                this.$emit('removeEntity', this.item.id);
            },

            updateConfirmation() {
                this.dialog = false;
                this.disabled = true;
                this.$emit('updateEntity', this.item);
            },

            addConfirmation() {
                this.$emit('addEntity', this.item);
            },

            selectionLabel(fieldName) {
                if (!fieldName)
                    return 'Select group members';
                if (fieldName === 'people')
                    return 'Paying for';
                if (fieldName === 'from')
                    return 'Initiator of the transaction';
                if (fieldName === 'to')
                    return 'Receiver of the transaction';
                return 'Select friends';
            },

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