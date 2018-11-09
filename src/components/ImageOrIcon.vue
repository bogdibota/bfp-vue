<template>
    <div>
        <img
                v-if="!imageUrl.includes('scontent')"
                :src="imageUrl"
                alt="Avatar"
        >
        <v-icon v-else>person</v-icon>
    </div>
</template>

<script>
    export default {
        name: 'image-or-icon',
        props: ['imageUrl'],
    };
</script>

<style scoped>

</style>