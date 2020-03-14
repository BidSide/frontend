<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="BidSide Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>

      <v-toolbar-title class="font-weight-bold">
        <router-link to="/" class="bidside-link bidside-link-white">
          BidSide
        </router-link>
      </v-toolbar-title>
    </div>

    <v-spacer />

    <HeaderNavigation />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import HeaderNavigation from './HeaderNavigation.vue';

@Component({
  components: {
    HeaderNavigation
  }
})
export default class Header extends Vue {}
</script>
