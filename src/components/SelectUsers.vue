<template>
    <v-select
            v-if="show"
            :items="items"
            v-model="selected"
            max-height="auto"
            :label="label"
            chips
            :multiple="multiple"
            autocomplete
            size="2"
            @change="$emit('change',selected)"
    >
        <template slot="selection" slot-scope="data">
            <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
            >
                <v-avatar>
                    <ImageOrIcon :imageUrl="data.item.avatar"></ImageOrIcon>
                </v-avatar>
                {{ data.item.name }}
            </v-chip>
        </template>
        <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
                <ImageOrIcon :imageUrl="data.item.avatar"></ImageOrIcon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
        </template>
    </v-select>
</template>

<script>
    import ImageOrIcon from './ImageOrIcon';

    export default {
        name: 'select-users',
        props: ['show', 'items', 'model', 'multiple', 'label'],
        components: {
            ImageOrIcon,
        },
        data() {
            return {
                selected: this.model,
            };
        },
    };
</script>

