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
                    <v-dialog v-model="dialog" width="500">
                        <div slot="activator" @click="loadFriends()">
                            <v-icon>add</v-icon>
                            Add {{element}}
                        </div>
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                Add {{element}}:
                            </v-card-title>

                            <!--<v-card-text>
                                <v-text-field type="text" v-model="itemName" placeholder='Insert name'/>
                            </v-card-text>-->
                            <v-card-text>
                                <v-autocomplete v-model="selected" :search-input.sync="searchInput" :items="searchItems"
                                           :debounce-search=".5"></v-autocomplete>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="primary" flat @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="primary" flat @click="addItem()">
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
    import { GET_PERSONS_QUERY } from '../apollo/graphql';
    import { getAccessToken } from '../lib/facebook';

    export default {
        name: 'items-box',
        data: () => ({
            dialog: '',
            selected: 'ana',
            searchInput: '',
            searchItems: [],
        }),
        methods: {
            loadFriends() {
                 this.$apollo.query({
                    query: GET_PERSONS_QUERY,
                    variables: {
                        accessToken: getAccessToken(),
                    }
                }).then((data) => {
                    this.searchItems=data.myFriends})
                    console.log(this.searchItems)
            },
            addItem() {
                alert("Item trying to add")
            },
        },
        watch: {
            searchInput(val) {

            },
        },
        props: ['items', 'icon', 'element'],
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