<template>
  <div class="friendList">
    <h1>My Groups</h1>
    <div class="asd">
      <div v-for="item in items">
        <div class="gg">
          <h1>{{ item.name }}</h1>
          <friend-list :items="item.users" :header="'Members'"></friend-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FriendList from './friend-list';

  export default {
    components: { FriendList },
    name: 'group-list',
    props: ['items'],
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 20px;
    text-transform: uppercase;
  }

  .asd{
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

  .gg {
    padding: 10px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: lightgray;
    margin: 15px;
    border-radius: 10%;
  }

  img {
    height: 60px;
    border-radius: 50%;
    float: right;
  }
</style>
