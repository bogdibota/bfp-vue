<template>
    <v-card>
        <v-avatar size="60px">
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
        margin: 5px;
        padding: 10px;

    }
    .v-avatar {
        margin: 8px;
    }
</style>