<template>
  <v-app>
    <Header />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

@Component({
  metaInfo: {
    title: 'BidSide',
    titleTemplate: '%s | BidSide'
  },

  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/styles/main';
</style>
