<template>
  <v-list :dense="$vuetify.breakpoint.xsOnly">
    <v-list-item v-for="(product, index) in products" :key="index">
      <v-list-item-content>
        <v-list-item-title>
          {{ `${product.name} ${product.sold ? '(SOLD)' : ''}` }}
        </v-list-item-title>

        <v-list-item-subtitle class="caption">
          <span v-if="product.currentPrice > 0" class="font-weight-bold">
            {{ 'Highest bid: ' }}
            {{ product.currentPrice }}
            <v-icon small color="primary">
              {{ 'mdi-currency-usd-circle' }}
            </v-icon>
          </span>
          <span v-else>
            {{ 'No bids yet.' }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action class="d-flex flex-row">
        <v-btn icon :disabled="product.sold">
          <v-icon color="primary">
            {{ 'mdi-pencil' }}
          </v-icon>
        </v-btn>

        <v-btn icon :disabled="product.sold" class="ml-2">
          <v-icon color="error">
            {{ 'mdi-delete-forever' }}
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Product } from '@/types';

@Component
export default class MyProducts extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly products!: Product[];
}
</script>
