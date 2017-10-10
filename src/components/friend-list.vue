<template>
  <div class="friendList">
    <h1>{{ header }}</h1>
    <div class="user-list-container">
      <div v-for="item in items">
        <div class="user-container">
          <button v-if="isGroupView" class="remove" v-on:click="removeMember(item.id)">X</button>
          <p>{{ item.name }}</p>
          <img :src="item.avatar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueRouter from 'vue-router';
  import * as api from './bfp-api';

  const router = new VueRouter({ mode: 'history' });

  export default {
    name: 'friend-list',
    props: ['items', 'header', 'isGroupView', 'groupId'],
    methods: {
      removeMember(friendId) {
        api.updateGroup(this.groupId, null, null, friendId, '{id}')
          .then(({ data: { updateGroup: { id } } }) => {
            router.push(`/my-groups/${id}`);
            router.go();
          });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 18px;
  }

  .user-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: auto 0;
  }

  .user-container {
    padding: 5px;
    width: 250px;
    display: flex;
    flex-direction: row;
    border-top: 3px solid chocolate;
    justify-content: space-between;
  }

  :last-child > .user-container {
    border-bottom: 3px solid chocolate;
  }

  img {
    height: 70px;
    border-radius: 50%;
  }

  .remove {
    background: red;
    color: cornsilk;
    border-radius: 50%;
    font-size: 15px;
    font-weight: bolder;
    height: 35px;
    width: 35px;
    border: none;
    margin: auto 0;
  }
</style>
