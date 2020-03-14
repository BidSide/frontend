<template>
  <footer class="primary white--text">
    <v-container>
      <div class="d-flex align-center">
        <h4>BidSide - {{ currentYear }}</h4>

        <v-spacer />

        <h4>
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
