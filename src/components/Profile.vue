<template>
    <div class="profile">
        <div class="header">
            <button v-on:click="navigate()">Home</button>
        </div>
        <h1>This is the profile page</h1>
        <div>
            <avatar v-bind:name="user.name" v-bind:src="user.avatar"></avatar>
            firstName: {{ user.name }} <br/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import router from '../router'
    import Avatar from 'vue-avatar'


    export default Vue.extend({
        name: 'profile',
        created: function () {
            // `this` points to the vm instance
            const regex = /access_token=(.*)&/g.exec(window.location);
            if (regex && regex[1]) {
                this.$store.dispatch('login', regex[1]);
            }
        },
        methods: {
            navigate() {
                router.push({name: "home"});
            },
        },
        computed: {
            user: function () {
                return this.$store.state.user
            },
        },
        components: {
            Avatar
        },
    });
</script>