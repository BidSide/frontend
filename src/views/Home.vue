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
          <ProductList :products="products" preview />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Product from '@/types/response/product';

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
  products: Product[] = [
    {
      id: 'asd1',
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet.',
      category: 'tech',
      starterPrice: 300,
      currentPrice: 300,
      buyoutPrice: 400
    },
    {
      id: 'asd2',
      name: 'Product 2',
      description: 'Lorem ipsum dolor sit amet.',
      category: 'misc',
      starterPrice: 250,
      currentPrice: 450,
      buyoutPrice: 500
    },
    {
      id: 'asd3',
      name: 'Product 3',
      description: 'Lorem ipsum dolor sit amet.',
      category: 'tech',
      starterPrice: 699,
      currentPrice: 750,
      buyoutPrice: 1200
    },
    {
      id: 'asd4',
      name: 'Product 4',
      description: 'Lorem ipsum dolor sit amet.',
      category: 'misc',
      starterPrice: 333,
      currentPrice: 333,
      buyoutPrice: 666
    }
  ];
}
</script>
