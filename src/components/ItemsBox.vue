<template>
    <div>
        <ul v-for="item in items" class="flex-container">
            <li class="flex-item wrapper">
                <slot name="elementBox" :item="item"></slot>
            </li>
            <DisplayItemBoxInformation class="information" :item="item"
                                       :displayInformation="displayFields(item)"></DisplayItemBoxInformation>
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
                    return this.displayFieldsExpanse(item);
                else if (item.__typename === 'Transaction')
                    return this.displayFieldsTransaction(item);
                else if (item.__typename === 'User')
                    return this.displayFieldsUser(item);

            },
            displayFieldsExpanse(item) {
                const displayFields = [];

                displayFields.push(this.displayField('Name', item.name, 'string'));
                displayFields.push(this.displayField('Date', item.date, 'date'));
                displayFields.push(this.displayField('Price', item.price, 'string'));
                displayFields.push(this.displayField('Payer', item.payer, 'avatar'));
                const field = {};
                field.fieldName = 'People';
                field.displayText = item.people.slice();
                field.type = 'avatarList';
                displayFields.push(field);

                return displayFields;
            },
            displayFieldsTransaction(item) {
                const displayFields = [];
                displayFields.push(this.displayField('Comment',item.comment,'string'));
                displayFields.push(this.displayField('Price',item.price,'string'));
                displayFields.push(this.displayField('From: ',item.from,'avatar'));
                displayFields.push(this.displayField('To: ',item.to,'avatar'));

                return displayFields;
            },
            displayFieldsUser(item) {
                const displayFields = [];
                displayFields.push(this.displayField(null,item,'avatar'));
                return displayFields;
            },
            displayField(fieldName, displayText, type) {
                const field = {};
                field.fieldName = fieldName;
                field.type = type;
                field.displayText = displayText;

                return field;
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
