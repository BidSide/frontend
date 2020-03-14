<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="BidSide Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
      />

      <h1 class="headline font-weight-bold">BidSide</h1>
    </div>

    <v-spacer />

    <h1>MENU</h1>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {}
</script>
