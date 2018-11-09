<template>
    <div>
        <ul v-for="item in items" class="flex-container">
            <li class="flex-item wrapper">
                <slot name="elementBox" :item="item"></slot>
            </li>
        </ul>

        <ul class="flex-container">
            <li class="flex-item">
                <slot name="addElementBox"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'items-box',
        props: ['items'],
    };
</script>

<style scoped>
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
</style>
