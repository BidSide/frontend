<template>
  <v-navigation-drawer v-model="isDrawerOpen" right absolute temporary>
    <v-list nav>
      <v-list-item>
        <v-list-item-icon>
          <v-img
            alt="BidSide Logo"
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

      <v-list-item v-for="(route, index) in routes" :key="index" link>
        <v-list-item-content>
          <v-list-item-title>
            {{ route.label }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Drawer extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  readonly isDrawerOpen!: boolean;
  @Prop({
    type: Array,
    required: true
  })
  readonly routes!: [];
}
</script>
