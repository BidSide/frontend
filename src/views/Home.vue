<template>
  <v-container class="fill-height">
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="10">
        <div class="d-flex justify-center align-center mb-10">
          <v-img
            alt="BidSide Logo"
            class="shrink mr-4 d-none d-sm-block"
            contain
            src="@/assets/logo.png"
            width="60"
          />

          <div>
            <h1 class="display-1 mb-1 text-center">
              {{ 'Welcome to' }}
              <span class="primary--text">
                {{ 'BidSide' }}
              </span>
            </h1>
            <h2 class="subtitle-2 text-center primary--text">
              {{ `The place where you'll want to spend money.` }}
            </h2>
          </div>
        </div>

        <ProductSearch />

        <v-sheet elevation="2" class="pa-4">
          <div v-if="loading" class="d-flex justify-center">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <ProductList
            v-else-if="products.length > 0"
            :products="products"
            preview
          />
          <p v-else class="display-1 text-center">
            {{ `Couldn't find any products.` }}
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Product } from '@/types';

// Components
import ProductSearch from '@/components/Products/ProductSearch.vue';
import ProductList from '@/components/Products/ProductList.vue';

@Component({
  metaInfo: {
    title: 'Home'
  },

  components: {
    ProductSearch,
    ProductList
  }
})
export default class Home extends Vue {
  loading = false;

  get products(): Product[] {
    return this.$store.getters.getProducts;
  }

  mounted() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProducts');
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
</script>
