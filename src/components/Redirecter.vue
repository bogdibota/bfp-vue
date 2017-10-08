<template>
  <h1>Redirecting...</h1>
</template>
<script>
  import VueRouter from 'vue-router';
  import UserService from './user-service';

  const router = new VueRouter({ mode: 'history' });
  export default {
    name: 'Redirecter',
    created() {
      const regex = /access_token=(.*)&/g.exec(window.location);
      if (regex && regex[1]) {
        UserService.login(regex[1]);
        router.push('/my-profile');
      } else {
        router.push('/home');
      }
      router.go();
    },
  };
</script>
<style scoped>
  h1 {
    background-color: rebeccapurple;
    color: lightgray;
  }
</style>
