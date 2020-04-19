<template>
  <v-card
    outlined
    class="pa-2 fill-height d-flex flex-column justify-space-between"
  >
    <div class="d-flex justify-space-between">
      <!-- Basic info -->
      <div>
        <v-card-title>
          {{ product.name }}
        </v-card-title>

        <v-card-subtitle>
          {{ product.category.name }}
        </v-card-subtitle>

        <v-card-text>
          {{ shortDescription }}
        </v-card-text>
      </div>

      <!-- Prices -->
      <div>
        <v-card-text>
          <div class="d-flex flex-column align-end">
            <span class="text-end">
              {{ 'Highest bid:' }}
            </span>

            <span class="font-weight-bold subtitle-1">
              {{
                product.currentPrice
                  ? product.currentPrice
                  : product.starterPrice
              }}
              <v-icon small color="secondary">
                {{ 'mdi-currency-usd-circle' }}
              </v-icon>
            </span>
          </div>

          <div class="d-flex flex-column align-end mt-2 mt-sm-4">
            <span class="text-end">
              {{ 'Buyout:' }}
            </span>

            <span class="font-weight-bold subtitle-1">
              {{ product.buyoutPrice }}
              <v-icon small color="secondary">
                {{ 'mdi-currency-usd-circle' }}
              </v-icon>
            </span>
          </div>
        </v-card-text>
      </div>
    </div>

    <!-- View product -->
    <v-card-actions class="d-flex justify-end">
      <v-btn color="primary" link :to="{ path: `/product/${product._id}` }">
        {{ 'View' }}

        <v-icon class="ml-1">
          {{ 'mdi-chevron-right' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Product } from '@/types';

@Component
export default class ProductListItem extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly product!: Product;

  get shortDescription() {
    return `${this.product.description.slice(0, 20)}...`;
  }
}
</script>
