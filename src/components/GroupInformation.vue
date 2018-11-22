<template>
    <div class="groupInfo">
        <h3>Group owner</h3>
        <UserCard :user="groupOwner"/>
    </div>
</template>

<script>
    import UserCard from './UserCard';

    export default {
        name: 'group-information',
        props: ['groupOwner'],
        components: {
            UserCard,
        },
    };
</script>

<style scoped>
    .groupInfo {
        width: 240px;
        margin: 30px;
    }
</style>