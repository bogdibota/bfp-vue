<template>
  <div id="createGroupDialog">
    <md-dialog-prompt
      :md-title="prompt.title"
      :md-ok-text="prompt.ok"
      :md-cancel-text="prompt.cancel"
      :md-input-placeholder="prompt.placeholder"
      @open="onOpen"
      @close="onClose"
      v-model="prompt.value"
      ref="dialog">
    </md-dialog-prompt>

    <md-button class="md-primary md-raised" @click="openDialog('dialog')">Add New Group</md-button>
  </div>
</template>
<script>
  import VueRouter from 'vue-router';
  import * as bogdiApi from './bfp-api';

  const router = new VueRouter({ mode: 'history' });
  export default {
    name: 'create-group-dialog',
    created() {
    },
    data: () => ({
      prompt: {
        title: 'Groups name?',
        ok: 'Create',
        cancel: 'Cancel',
        id: 'name',
        name: 'name',
        placeholder: 'Type your group\'s name...',
        value: '',
      },

    }),
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      onOpen() {
        console.log('Opened');
      },
      onClose(type) {
        if (type === 'ok') {
          bogdiApi
            .createGroup(this.prompt.value, '{id}')
            .then(() => {
              router.push('/my-groups');
              router.go();
            });
        }
      },
    },
  };
</script>
