<template>
  <div id="addMemberDialog">
    <md-dialog md-open-from="#addButton" md-close-to="#addButton" ref="addDialog">
      <md-dialog-title>Add member</md-dialog-title>
      <md-dialog-content><input v-model="newMemberName" v-on:keyup="textChanged()"
                                v-on:keydown.enter="addMember(friendsToDisplay[0].id)"/>
        <div v-for="friend in friendsToDisplay">
          <div class="friend" v-on:click="addMember(friend.id)"> <div class="friend-name">{{ friend.name }}</div> <img :src="friend.avatar"/></div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('addDialog', false)">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button id="#addButton" class="md-icon-button md-raised add-button" @click="openDialog('addDialog')">
      <md-icon>+</md-icon>
    </md-button>
  </div>
</template>
<script>
  import VueRouter from 'vue-router';
  import * as api from './bfp-api';

  const router = new VueRouter({ mode: 'history' });

  export default {
    name: 'add-member-dialog',
    data() {
      return {
        newMemberName: '',
        friendsToDisplay: [],
      };
    },
    created() {
      this.friendsToDisplay = this.friends;
    },
    props: ['groupId', 'friends'],
    methods: {
      openDialog(ref) {
        this.textChanged();
        this.$refs[ref].open();
      },
      closeDialog(ref, isOk) {
        this.$refs[ref].close();
        if (isOk) {
          this.sendRequest();
        }
      },
      addMember(friendId) {
        if (this.friendsToDisplay.length === 0) {
          return;
        }
        api.updateGroup(this.groupId, null, friendId, null, '{id}')
          .then(({ data: { updateGroup: { id } } }) => {
            router.push(`/my-groups/${id}`);
            router.go();
          });
      },
      textChanged() {
        this.friendsToDisplay = this.friends
          .filter(({ name }) => name.toLowerCase().indexOf(this.newMemberName.toLowerCase()) > -1)
          .splice(0, 3);
        console.log(this.friendsToDisplay);
      },
    },
  };
</script>
<style scoped>
  .add-button {
    background: chocolate;
    color: oldlace;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 15px
  }

  .add-button:hover {
    background: white;
    color: chocolate;
  }

  .friend {
    margin: 5px 0;
    padding-right: 10px;
    font-weight: bold;
    font-size: 16px;
    background: chocolate;
    color: cornsilk;
    cursor: pointer;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .friend:hover {
    margin-left: 10px;
    padding-right: 0;
    width: 290px;
    background: cornsilk;
    color: chocolate;
  }
  img {
    border-radius: 50%;
  }

  .friend-name {
    margin: auto 5px;
  }
   input{
     width:300px;
   }

</style>
