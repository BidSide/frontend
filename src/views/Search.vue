<template>
  <v-container>
    <!-- Result (products) -->
    <v-sheet elevation="2" class="pa-4">
      <v-btn color="primary mb-4" @click="handleBack">
        <v-icon class="mr-1">
          {{ 'mdi-chevron-left' }}
        </v-icon>

        {{ 'Back to' }}
        {{
          $route.params.categoryName ? $route.params.categoryName : 'products'
        }}
      </v-btn>

      <div v-if="loading" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <ProductList
        v-else-if="searchResult.length > 0"
        :products="searchResult"
      />
      <p v-else class="display-1 text-center">
        {{ `Couldn't find any products.` }}
      </p>
    </v-sheet>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Product } from '@/types';

// Components
import ProductList from '@/components/Products/ProductList.vue';

@Component({
  metaInfo: {
    title: 'Search'
  },

  components: {
    ProductList
  }
})
export default class Search extends Vue {
  loading = false;

  errorSnackbar = false;
  errorText = '';

  get searchResult(): Product[] {
    return this.$store.getters.getProducts;
  }

  mounted() {
    this.fetchSearchResult();
  }

  async fetchSearchResult() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProducts', {
        categoryName: this.$route.params.categoryName,
        searchTerm: this.$route.params.searchTerm
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.loading = false;
  }

  handleBack() {
    if (this.$route.params.categoryName) {
      this.$router.push(
        `/products/category/${this.$route.params.categoryName}`
      );
    } else {
      this.$router.push('/products');
    }
  }
}
</script>
