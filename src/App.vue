<template>
  <v-app>
    <Header />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header
  }
});
</script>
