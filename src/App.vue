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
import Component from 'vue-class-component';

// Components
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>
