<template>
  <div id="app">
    <div class="navbar">
      <router-link to="/home">Home</router-link>
      <router-link to="/my-profile">My Profile</router-link>
      <router-link to="/my-groups">My Groups</router-link>
      <button v-on:click="logout">Logout</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  // TODO: rename asd-s
  import VueRouter from 'vue-router';
  import UserService from './components/user-service';

  const router = new VueRouter({ mode: 'history' });
  export default {
    name: 'app',
    methods: {
      logout() {
        UserService.logout();
        router.push('/home');
        router.go();
      },
    },
  };
</script>

<style>
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: oldlace;
    min-height: 100vh;
    height: 100%;
  }

  button {
    margin-right: 20px;
    float: right;
  }

  a {
    color: #373737 !important;
    text-transform: uppercase;
    font-weight: bold;
    float: left;
    margin: 0 10px;
    font-size: 15px;
    padding: 2px;
    text-decoration: none !important;
  }

  .navbar {
    padding-top: 10px;
    float:left;
    width: 100%;
    padding-left: 5px;
    display: block;
  }


</style>
