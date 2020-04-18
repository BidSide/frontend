<template>
  <v-container class="fill-height">
    <v-row justify="center" style="max-width: initial;">
      <v-col sm="8" xs="12">
        <div class="d-flex flex-column align-center">
          <h1 class="display-1 text-center">
            {{ 'Sorry, but the page you just tried to visit, does not exist.' }}
          </h1>

          <v-icon large class="mt-4">
            {{ 'mdi-emoticon-dead' }}
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: {
    title: 'Page not found!'
  }
})
export default class NotFound extends Vue {}
</script>
