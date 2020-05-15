<template>
  <div>Public profile test</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PublicProfileInterface } from '@/types';

@Component({
  metaInfo: {
    title: 'View profile'
  }
})
export default class PublicProfile extends Vue {
  loading = false;

  get publicProfile(): PublicProfileInterface | null {
    return this.$store.getters.getPublicProfile;
  }

  mounted() {
    this.fetchPublicProfile();
  }

  async fetchPublicProfile() {
    this.loading = true;

    try {
      await this.$store.dispatch('fetchPublicProfile', {
        id: this.$route.params.id
      });
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
</script>
