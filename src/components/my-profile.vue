<template>
  <div id="fasz">
    <h1 v-if="!isLoggedIn">You must be logged in to use this page</h1>
    <div v-else class="hello2">
      <h1>Hello {{ userName }}</h1>
      <img :src="avatar"/>
      <create-group-dialog></create-group-dialog>
    </div>
    <friend-list :items="myFriends" :header="'My Friends'"></friend-list>
  </div>
</template>

<script>
  import FriendList from './friend-list';
  import UserService from './user-service';
  import CreateGroupDialog from './create-group-dialog';
  import * as bogdiApi from './bfp-api';


  export default {
    components: {
      CreateGroupDialog,
      FriendList,
    },
    name: 'Hello2',
    data() {
      return {
        myFriends: [],
        avatar: '',
        userName: '',
        isLoggedIn: false,
      };
    },
    created() {
      this.isLoggedIn = UserService.isLoggedIn();
      if (!this.isLoggedIn) {
        return;
      }
      bogdiApi
        .login(`{
          name
          avatar
        }`)
        .then(({ data: { login: { avatar, name } } = {}, error }) => {
          if (error || !avatar) {
            console.log(error);
          } else {
            this.avatar = avatar;
            this.userName = name;
          }
        });
      bogdiApi
        .myFriends(`{
          name
          avatar
        }`)
        .then(({ data: { myFriends } }) => {
          this.myFriends = myFriends;
        });
    },
  }
  ;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  img {
    border-radius: 50%;
    width: 70px;
    margin-bottom: 20px;
  }

  a {
    color: #42b983;
  }
  .hello2{
    align-items: center;
    width: 100%;
    display:flex;
    flex-direction: column;
    margin-bottom: 50px;
    border: 3px solid rebeccapurple;
  }
</style>
