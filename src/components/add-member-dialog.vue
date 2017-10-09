<template>
  <div id="addMemberDialog">
    <md-dialog md-open-from="#addButton" md-close-to="#addButton" ref="addDialog">
      <md-dialog-title>Best dialog</md-dialog-title>
      <md-dialog-content><input v-model="newMemberName" v-on:keyup="textChanged()"/>
        <div v-for="friend in friendsToDisplay">
          <div> {{ friend.name }} <img :src="friend.avatar"/></div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('addDialog', false)">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('addDialog', true)">Ok</md-button>
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
    props: ['groupId', 'friends'],
    created() {
      this.friendsToDisplay = this.friends;
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref, isOk) {
        this.$refs[ref].close();
        if (isOk) {
          this.sendRequest();
        }
      },
      sendRequest() {
        api.updateGroup(this.groupId, null, 1823454117685095, null, '{id}')
          .then(({ data: { updateGroup: { id } } }) => {
            router.push(`/my-groups/${id}`);
            router.go();
          });
      },
      textChanged() {
        this.friendsToDisplay = this.friends
          .filter(({ name }) => name.toLowerCase().indexOf(this.newMemberName.toLowerCase()) > -1);
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
</style>
