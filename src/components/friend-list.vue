<template>
  <div class="friendList">
    <h1>{{ header }}</h1>
    <div class="asd">
      <div v-for="item in items">
        <div class="gg">
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
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    props: ['items', 'header'],
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 18px;
  }

  .asd {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: auto;
  }

  .gg {
    padding: 10px;
    width: 250px;
    display: flex;
    flex-direction: row;
    border-top: 3px solid chocolate;
    justify-content: space-between;
  }

  img {
    height: 70px;
    border-radius: 50%;
    float: right;
  }
</style>
