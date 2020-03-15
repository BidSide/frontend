<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-icon>
        <v-img
          alt="BidSide Logo"
          class="shrink"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          BidSide
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item
      v-for="(route, index) in routes"
      :key="index"
      link
      :to="route.url"
    >
      <v-list-item-icon>
        <v-icon>
          {{ route.icon }}
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ route.label }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class DrawerContent extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly routes!: [];
}
</script>
