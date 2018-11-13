<template>
    <v-card clas="card">
        <v-avatar>
            <ImageOrIcon :imageUrl="user.avatar"></ImageOrIcon>
        </v-avatar>
        {{user.name}}
    </v-card>
</template>

<script>

    import ImageOrIcon from './ImageOrIcon';

    export default {

        name: 'user-card',
        props: ['user'],
        components: {
            ImageOrIcon,
        },
    };
</script>

<style scoped>
    .v-card {
        margin: 10px;
        padding: 10px;
    }
</style>