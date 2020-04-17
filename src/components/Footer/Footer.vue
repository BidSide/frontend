<template>
  <v-footer app>
    <v-container>
      <div class="d-flex align-center justify-center">
        <h4>BidSide - &copy;{{ currentYear }}</h4>
      </div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {
  currentDate: Date = new Date();

  get currentYear() {
    return this.currentDate.getFullYear();
  }
}
</script>
