<template>
  <div>
    <!-- desktop -->
    <div class="d-none d-md-block">
      <HeaderNavigationDesktop :routes="routes" />
    </div>

    <!-- mobile -->
    <div class="d-block d-md-none">
      <HeaderNavigationMobile :routes="routes" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import HeaderNavigationDesktop from './HeaderNavigationDesktop.vue';
import HeaderNavigationMobile from './HeaderNavigationMobile.vue';

@Component({
  components: {
    HeaderNavigationDesktop,
    HeaderNavigationMobile
  }
})
export default class HeaderNavigation extends Vue {
  // TODO: add icons
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
