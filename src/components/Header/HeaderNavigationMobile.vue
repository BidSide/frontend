<template>
  <div>
    <v-btn icon @click="$emit('openDrawer')">
      <v-icon>{{ 'mdi-menu' }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class HeaderNavigationMobile extends Vue {}
</script>
