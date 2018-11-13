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
                            <v-list-tile-title v-html="field.fieldName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="field.displayText"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-content v-if="field.type==='date'">
                            <v-list-tile-title v-html="field.fieldName"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="getDate(field.displayText)"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-content v-if="field.type==='avatar'">
                            <v-list-tile-title v-html="field.fieldName"></v-list-tile-title>
                            <UserCard :user="field.displayText"></UserCard>
                        </v-list-tile-content>

                        <v-list-tile-content v-if="field.type==='avatarList'">
                            <v-list-tile-title v-html="field.fieldName"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-container fluid grid-list-md>
                                    <v-layout row wrap>
                                        <v-avatar v-for="user in field.displayText" class="avatars">
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
                <v-btn color="primary" flat @click="dialog = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import ImageOrIcon from './ImageOrIcon';
    import UserCard from './UserCard';

    export default {

        name: 'display-item-box-information',
        props: ['item', 'displayInformation'],

        data: () => ({
            dialog: '',
        }),
        components: {
            ImageOrIcon, UserCard,
        },
        methods: {
            getDate(dateFloat) {
                const date = new Date(dateFloat);
                return date.toDateString();
            },
        },
    };
</script>

<style scoped>
    .content {
        margin: 20px;
    }

    .avatars {
        margin: 2px;
    }

    .fluid {
        padding: 5px;
    }

</style>