<template>
  <div class="d-block d-md-none">
    <v-btn icon @click.prevent="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class HeaderNavigationMobile extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly links!: {
    label: string;
    url: string;
  }[];

  private isDrawerOpen = false;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
}
</script>
