<template>
    <div>
        <ul v-for="item in items" class="flex-container">
            <li class="flex-item wrapper">
                <slot name="elementBox" :item="item"></slot>
            </li>
            <DisplayItemBoxInformation class="information" :item="item"
                                       :displayInformation="displayFields(item)"
                                       @removeExpenseInterm="removeExpenseInterm()"
            ></DisplayItemBoxInformation>
        </ul>

        <ul class="flex-container">
            <li class="flex-item">
                <slot name="addElementBox"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    import DisplayItemBoxInformation from './DisplayItemBoxInformation';

    export default {
        name: 'items-box',
        props: ['items'],
        components: {
            DisplayItemBoxInformation,
        },
        data: () => ({
            dialogProp: false,
        }),
        methods: {
            displayFields(item) {
                if (item.__typename == 'Expense')
                    return this.displayFieldsExpanse();
                else if (item.__typename === 'Transaction')
                    return this.displayFieldsTransaction();
                else if (item.__typename === 'User')
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
                        displayText:'People',
                        type: 'avatarList'
                    }
                ]
            },
            displayFieldsTransaction() {
                return [
                    this.displayField('Comment', 'comment', 'string'),
                    this.displayField('Price', 'price', 'string'),
                    this.displayField('From:', 'from', 'avatar'),
                    this.displayField('To:', 'to', 'avatar')
                ]
            },
            displayFieldsUser() {
                return [
                    this.displayField(null,null, 'avatar')
                ];
            },
            displayField(displayText, fieldName, type) {
                return {
                    'displayText': displayText,
                    'fieldName': fieldName,
                    'type': type
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
