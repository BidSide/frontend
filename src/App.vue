<template>
  <v-app>
    <Header :routes="routes" @openDrawer="openDrawer" />

    <v-navigation-drawer v-model="isDrawerOpen" right light app temporary>
      <DrawerContent :routes="routes" />
    </v-navigation-drawer>

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
import DrawerContent from '@/components/Drawer/DrawerContent.vue';
import Footer from '@/components/Footer/Footer.vue';

import Route from '@/types/route';

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
  private isDrawerOpen = false;

  get routes(): Route[] {
    return [
      {
        label: 'Home',
        url: '/',
        icon: 'mdi-home',
        visible: true
      },
      {
        label: 'Login',
        url: '/login',
        icon: 'mdi-account',
        visible: !this.$store.getters.getJwt
      },
      {
        label: 'Register',
        url: '/register',
        icon: 'mdi-account-plus',
        visible: !this.$store.getters.getJwt
      },
      {
        label: 'Profile',
        url: '/profile',
        icon: 'mdi-account',
        visible: this.$store.getters.getJwt
      }
    ];
  }

  openDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
</script>

<style lang="scss">
@import '@/styles/global';
</style>
