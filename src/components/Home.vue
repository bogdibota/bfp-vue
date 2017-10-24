<template>
  <div id="home">
    <button v-on:click="login()">Login with facebook
    </button>
  </div>
</template>
<script>
  import { FB_CLIENT_ID, FB_REDIRECT_URL } from '../env';

  export default {
    name: 'Home',
    methods: {
      login() {
        window.location = 'https://www.facebook.com/v2.10/dialog/oauth' +
          `?client_id=${FB_CLIENT_ID}` +
          `&redirect_uri=${FB_REDIRECT_URL}` +
          '&response_type=token' +
          '&scope=public_profile,user_friends';
      },
    },
  };
</script>
<style scoped>
  button {
    background: #3b5998;
    color: #f7f7f7;
    font-size: 25px;
    width: 250px;
    border: 2px solid black;
  }
</style>
