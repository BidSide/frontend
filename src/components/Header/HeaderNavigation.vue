<template>
  <div>
    <HeaderNavigationDesktop :links="links" />

    <HeaderNavigationMobile :links="links" />
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
  private links = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Login',
      url: '/login'
    },
    {
      label: 'Register',
      url: '/register'
    }
  ];
}
</script>
