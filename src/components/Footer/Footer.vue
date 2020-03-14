<template>
  <footer class="primary white--text">
    <v-container>
      <div class="d-flex align-center flex-column flex-sm-row">
        <h4>BidSide - {{ currentYear }}</h4>

        <v-spacer />

        <h4 class="mt-2 mt-sm-0">
          Created by:
          <a
            href="https://github.com/richardszegh"
            target="_blank"
            class="bidside-link bidside-link-white"
          >
            Richárd Szegh
          </a>
        </h4>
      </div>
    </v-container>
  </footer>
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
