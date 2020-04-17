<template>
  <nav>
    <router-link
      v-for="(route, index) in visibleRoutes"
      :key="index"
      :to="route.url"
      class="navlink bidside-link bidside-link-white font-weight-bold"
    >
      {{ route.label }}
    </router-link>

    <router-link
      v-if="$store.getters.getJwt"
      to="/"
      class="navlink bidside-link bidside-link-white font-weight-bold"
    >
      <span @click="handleLogout">
        {{ 'Logout' }}
      </span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import Route from '@/types/route';

@Component
export default class HeaderNavigationDesktop extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly routes!: Route[];

  get visibleRoutes() {
    return this.routes.filter(route => route.visible);
  }

  handleLogout() {
    this.$store.dispatch('logout');
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.navlink {
  position: relative;

  + .navlink {
    margin-left: $spacer * 8;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -$spacer * 5;
      width: 2px;
      height: 100%;
      background-color: white;
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
