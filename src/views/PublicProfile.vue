<template>
  <div>Public profile test</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: {
    title: 'View profile'
  }
})
export default class PublicProfile extends Vue {}
</script>
