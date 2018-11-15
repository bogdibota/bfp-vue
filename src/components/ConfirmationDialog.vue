<template>
    <v-dialog v-model="dialog" max-width="310">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                {{title}}
            </v-card-title>

            <v-card-text>
               {{message}}
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" flat="flat" @click="confirm()">
                    Confirm
                </v-btn>
                <v-btn color="primary" flat="flat" @click="dialog = false">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'confirmation-dialog',
        data() {
            return {
                dialog: false,
            }
        },
        methods: {
            open() {
                this.dialog = true;
            },
            confirm() {
                this.$emit('confirm');
                this.dialog = false;
            }
        },
        props: [ 'title','message' ]

    };
</script>

<style scoped>

</style>