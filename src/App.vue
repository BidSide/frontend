<template>
  <v-app>
    <Header :routes="routes" />

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
}
</script>

<style lang="scss">
@import '@/styles/global';
</style>
