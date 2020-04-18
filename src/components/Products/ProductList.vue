<template>
  <div>
    <v-row justify="center" style="max-width: initial;">
      <v-col
        v-for="(product, index) in preview ? previewProducts : products"
        :key="index"
        cols="12"
        lg="6"
        xl="4"
      >
        <ProductListItem :product="product" />
      </v-col>
    </v-row>

    <div v-if="preview" class="d-flex justify-center mt-2">
      <v-btn color="primary" link to="/products">
        {{ 'All products' }}

        <v-icon class="ml-1">
          {{ 'mdi-chevron-right' }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Product } from '@/types';

// Components
import ProductListItem from './ProductListItem.vue';

@Component({
  components: {
    ProductListItem
  }
})
export default class ProductList extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  readonly preview!: boolean;
  @Prop({
    type: Array,
    required: true
  })
  readonly products!: Product[];

  get previewProducts() {
    return this.products.slice(0, 3);
  }
}
</script>
