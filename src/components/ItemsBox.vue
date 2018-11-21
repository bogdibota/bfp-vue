<template>
    <div>
        <ul v-for="(item,index) in items" class="flex-container">
            <li class="flex-item wrapper">
                <slot name="elementBox" :item="item"></slot>
            </li>

            <div class="information">
                <v-icon size="25px" @click="$refs.informationDialog[index].open()">info</v-icon>

                <ItemsBoxDialog ref="informationDialog"
                                :title="item.__typename"
                                :item="item"
                                :addition="false"
                                :canUpdateOrDelete="canUpdateOrDelete(item)"
                                :displayInformation="displayFields(item.__typename)"
                                :listOfFriends="membersOfGroup"
                                @removeEntity="$emit('removeEntity',$event)"
                                @updateEntity="$emit('updateEntity',$event)"
                ></ItemsBoxDialog>
            </div>
        </ul>

        <ul class="flex-container">
            <li class="flex-item">
                <div @click="$refs.addDialog.open()">
                    <v-icon>add</v-icon>
                    Add {{type}}

                    <ItemsBoxDialog ref="addDialog"
                                    :title="'Add ' + type"
                                    :item="emptyObject()"
                                    :addition="true"
                                    :canUpdateOrDelete="false"
                                    :displayInformation="displayFields(type)"
                                    :listOfFriends="membersOfGroup"
                                    @addEntity="$emit('addEntity',$event)"
                    ></ItemsBoxDialog>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import ItemsBoxDialog from './ItemsBoxDialog';

    export default {
        name: 'items-box',
        props: ['items', 'ownerId', 'membersOfGroup', 'type'],
        components: {
            ItemsBoxDialog,
        },
        data: () => ({
            dialogProp: false,
        }),
        methods: {
            emptyObject() {
                const item = {};

                if (this.type === 'Expense') {
                    item.__typename = 'Expense';
                    item.name = '';
                    item.payer = this.$store.state.user;
                    item.price = '';
                    item.people = [];
                    item.date = '';
                }
                else if (this.type === 'Transaction') {
                    item.__typename = 'Transaction';
                    item.comment = '';
                    item.price = '';
                    item.to = {};
                    item.from = {};
                }
                else if (this.type === 'User') {
                    item.__typename = 'User';
                    item.name = '';
                    item.avatar = '';
                }

                return item;
            },
            canUpdateOrDelete(item) {
                if (item.__typename == 'Expense') {
                    return this.$store.state.user.userId === this.ownerId ||
                        this.$store.state.user.userId === item.payer.id;
                }
                else if (item.__typename == 'Transaction')
                    return this.$store.state.user.userId === this.ownerId ||
                        this.$store.state.user.userId === item.from.id;
                else if (item.__typename == 'User')
                    return this.$store.state.user.userId === this.ownerId;
            },
            displayFields(typename) {
                if (typename == 'Expense')
                    return this.displayFieldsExpanse();
                else if (typename === 'Transaction')
                    return this.displayFieldsTransaction();
                else if (typename === 'User')
                    return this.displayFieldsUser();

            },
            displayFieldsExpanse(item) {
                return [
                    this.displayField('Name', 'name', 'string'),
                    this.displayField('Date', 'date', 'date'),
                    this.displayField('Price', 'price', 'string'),
                    this.displayField('Payer', 'payer', 'avatar'),
                    {
                        fieldName: 'people',
                        displayText: 'People',
                        type: 'avatarList',
                    },
                ];
            },
            displayFieldsTransaction() {
                return [
                    this.displayField('Comment', 'comment', 'string'),
                    this.displayField('Price', 'price', 'string'),
                    this.displayField('From:', 'from', 'avatar'),
                    this.displayField('To:', 'to', 'avatar'),
                ];
            },
            displayFieldsUser() {
                return [
                    this.displayField(null, null, 'avatar'),
                ];
            },
            displayField(displayText, fieldName, type) {
                return {
                    'displayText': displayText,
                    'fieldName': fieldName,
                    'type': type,
                };
            },
        },

    };
</script>

<style scoped>
    .flex-container {
        position: relative;
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

    .information {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
</style>
