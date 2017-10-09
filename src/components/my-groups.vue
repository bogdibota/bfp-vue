<template>
  <group-list :items="myGroups"></group-list>
</template>
<script>
  import GroupList from './group-list';
  import * as bogdiService from './bfp-api';

  export default {
    components: { GroupList },
    name: 'my-groups',
    data() {
      return {
        myGroups: [],
      };
    },
    created() {
      bogdiService
        .myGroups(`{
          id
          name
          users {
            name
            avatar
          }
        }`)
        .then(({ data: { myGroups } }) => {
          this.myGroups = myGroups;
        });
    },
  };
</script>
