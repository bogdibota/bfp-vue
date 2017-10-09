<template>
  <div class="two-column">
    <div class="left-column">
      <h1>{{ group.name }}</h1>
    </div>
    <div class="right-column">
      <friend-list :header="'Members'" :items="group.users"></friend-list>
      <add-member-dialog :groupId="groupId" :friends="userNotInGroup"></add-member-dialog>
    </div>
  </div>
</template>

<script>
  import FriendList from './friend-list';
  import AddMemberDialog from './add-member-dialog';
  import * as bogdiSServiceInThisFile from './bfp-api';
  /* eslint-disable linebreak-style */

  export default {
    components: { FriendList, AddMemberDialog },
    name: 'group',
    data() {
      return {
        groupId: '',
        group: {},
        userNotInGroup: [],
      };
    },
    created() {
      this.groupId = this.$route.params.id;
      bogdiSServiceInThisFile
        .getGroupById(
          this.$route.params.id, `{
              name
              users{
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
