<template>
  <div class="friendList">
    <h1>My Groups</h1>
    <div class="asd">
      <div v-for="item in items">
        <div class="group-card" v-on:click="goToGroupView(item.id)">
          <h1>{{ item.name }}</h1>
          <friend-list :items="item.users" :header="'Members'"></friend-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueRouter from 'vue-router';
  import FriendList from './friend-list';

  const router = new VueRouter({ mode: 'history' });
  export default {
    components: { FriendList },
    name: 'group-list',
    props: ['items'],
    methods: {
      goToGroupView(id) {
        router.push(`/my-groups/${id}`);
        router.go();
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 20px;
    text-transform: uppercase;
  }

  .asd {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 10%;
  }

  p {
    margin-right: 50px;
  }

  .group-card {
    padding: 10px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: lightgray;
    margin: 15px;
    border-radius: 10%;
    cursor: pointer;
  }

  img {
    height: 60px;
    border-radius: 50%;
    float: right;
  }
</style>
