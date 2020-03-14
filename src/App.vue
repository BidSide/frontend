<template>
  <v-app class="relative">
    <Header :routes="routes" />

    <Drawer :routes="routes" :isDrawerOpen="isDrawerOpen" />

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
import Drawer from '@/components/Drawer/Drawer.vue';
import Footer from '@/components/Footer/Footer.vue';

@Component({
  metaInfo: {
    title: 'BidSide',
    titleTemplate: '%s | BidSide'
  },

  components: {
    Header,
    Drawer,
    Footer
  }
})
export default class App extends Vue {
  // TODO: add icons
  private routes = [
    {
      label: 'Home',
      url: '/',
      icon: ''
    },
    {
      label: 'Login',
      url: '/login',
      icon: ''
    },
    {
      label: 'Register',
      url: '/register',
      icon: ''
    }
  ];
  private isDrawerOpen = false;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
</script>

<style lang="scss">
@import '@/styles/global';
</style>
