<template>
  <div class="two-column">
    <div class="left-column">
      <h1>{{ group.name }}
        <input v-model="group.name" v-if="isEdit">
        <button v-if="isEdit" v-on:click="updateGroupName()">ok</button>
        <button v-if="!isEdit" v-on:click="isEdit = !isEdit">Edit</button>
      </h1>
    </div>
    <div class="right-column">
      <friend-list :header="'Members'" :items="group.users" :isGroupView="true" :groupId="groupId"></friend-list>
      <add-member-dialog :groupId="groupId" :friends="userNotInGroup"></add-member-dialog>
    </div>
  </div>
</template>

<script>
  import FriendList from './friend-list';
  import AddMemberDialog from './add-member-dialog';
  import * as bogdiSServiceInThisFile from './bfp-api';
  /* eslint-disable linebreak-style */
  // TODO: refactor add member dialog => no refresh on page

  export default {
    components: { FriendList, AddMemberDialog },
    name: 'group',
    data() {
      return {
        groupId: '',
        group: {},
        asd: 'asd',
        userNotInGroup: [],
        isEdit: false,
      };
    },
    created() {
      this.groupId = this.$route.params.id;
      bogdiSServiceInThisFile
        .getGroupById(
          this.$route.params.id, `{
              name
              users{
                id
                name
                avatar
                }
              }`)
        .then(({ data: { groupById } }) => {
          this.group = groupById;
        });
      bogdiSServiceInThisFile
        .myFriends(this.groupId, `{
          id
          name
          avatar
        }`)
        .then(({ data: { myFriends } }) => {
          this.userNotInGroup = myFriends;
        });
    },
    methods: {
      updateGroupName() {
        this.isEdit = !this.isEdit;
        bogdiSServiceInThisFile.updateGroup(this.groupId, this.group.name, null, null, '{name}')
          .then(({ data: { updateGroup: { name } } }) => {
            this.group.name = name;
          });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 18px;
    color: navy;
    text-transform: uppercase;
  }

  .two-column {
    display: flex;
    flex-direction: row;
  }

  .left-column {
    flex: 2;
    border: 2px solid rebeccapurple;
    margin: 10px 5px;
  }

  .right-column {
    flex: 1;
    border: 2px solid chocolate;
    margin: 10px 5px;
  }

</style>
