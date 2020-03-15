<template>
  <v-app-bar color="primary" dark app>
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

    <HeaderNavigation :routes="routes" />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// Components
import HeaderNavigation from './HeaderNavigation.vue';

@Component({
  components: {
    HeaderNavigation
  }
})
export default class Header extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly routes!: [];
}
</script>
