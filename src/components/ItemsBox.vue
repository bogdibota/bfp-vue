<template>
    <div>
        <v-content>
        <ul v-for="item in items" class="flex-container">
            <li class="flex-item">
                <v-icon>{{icon}}</v-icon>
                {{item}}
            </li>
        </ul>
        <ul class="flex-container">
            <li class="flex-item">
                <v-dialog  width="500">
                    <div slot="activator">
                        <v-icon>add</v-icon>
                        Add {{element}}
                    </div>

                    <v-card>
                        <v-card-title
                                class="headline grey lighten-2"
                                primary-title>
                            Add group:
                        </v-card-title>

                        <v-card-text>
                            <v-text-field type="text" placeholder="Person name"/>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    flat
                                    @click="dialog = false "
                            >
                                Close
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    flat
                                    @click="addItem()"
                            >
                                Add
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </li>

        </ul>
        </v-content>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'items-box',

        methods: {
            addItem() {
                alert("item added");
            }
        },
        props: ['items','icon','element']
    };
</script>

<style scoped>
    .home {
        flex: 1;
        display: flex;
        height: border-box;
    }

    .md-app {
        flex: 1;
        min-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .md-title {
        flex-grow: 2;
    }

    .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: inline-flex;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .flex-item {
        background: #b3d4fc;
        padding: 5px;
        width: 200px;
        height: 150px;
        margin: 10px;
        line-height: 150px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .flex-item:hover {
        background: darkblue;
        cursor: pointer
    }

    .modal-open {
        padding: 0px;
    }
</style>