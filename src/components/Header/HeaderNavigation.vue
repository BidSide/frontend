<template>
  <div>
    <!-- desktop nav -->
    <HeaderNavigationDesktop :links="links" />

    <!-- mobile nav -->
    <div class="d-block d-md-none"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import HeaderNavigationDesktop from './HeaderNavigationDesktop.vue';

@Component({
  components: {
    HeaderNavigationDesktop
  }
})
export default class HeaderNavigation extends Vue {
  links = [
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
