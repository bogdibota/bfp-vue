<template>
  <div class="friendList">
    <h1>{{ header }}</h1>
    <div class="user-list-container">
      <div v-for="item in items">
        <div class="user-container">
          <p>{{ item.name }}</p>
          <img :src="item.avatar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'friend-list',
    props: ['items', 'header'],
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
    margin: auto;
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
</style>
