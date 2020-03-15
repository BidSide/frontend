<template>
  <v-app>
    <Header :routes="routes" />

    <v-navigation-drawer v-model="isDrawerOpen" right light app>
      <DrawerContent :routes="routes" />
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import Header from '@/components/Header/Header.vue';
import DrawerContent from '@/components/Drawer/DrawerContent.vue';
import Footer from '@/components/Footer/Footer.vue';

@Component({
  metaInfo: {
    title: 'BidSide',
    titleTemplate: '%s | BidSide'
  },

  components: {
    Header,
    DrawerContent,
    Footer
  }
})
export default class App extends Vue {
  private routes = [
    {
      label: 'Home',
      url: '/',
      icon: 'mdi-home'
    },
    {
      label: 'Login',
      url: '/login',
      icon: 'mdi-account'
    },
    {
      label: 'Register',
      url: '/register',
      icon: 'mdi-account-plus'
    }
  ];

  private isDrawerOpen = false;

  openDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
</script>

<style lang="scss">
@import '@/styles/global';
</style>
