<template>
  <v-container>
    <!-- Categories & Products (desktop) -->
    <div class="d-none d-md-block">
      <v-row>
        <v-col cols="3">
          <!-- Categories -->
          <v-sheet elevation="2">
            <div v-if="categoriesLoading" class="d-flex justify-center">
              <v-progress-circular indeterminate color="primary" />
            </div>

            <CategoryList
              v-else-if="categories.length > 0"
              :categories="categories"
            />
            <p v-else class="subtitle text-center">
              {{ `Couldn't find any categories.` }}
            </p>
          </v-sheet>
        </v-col>

        <v-col cols="9">
          <!-- Products -->
          <ProductSearch />

          <v-sheet elevation="2" class="pa-4">
            <div v-if="loading" class="d-flex justify-center">
              <v-progress-circular indeterminate color="primary" />
            </div>

            <ProductList v-else-if="products.length > 0" :products="products" />
            <p v-else class="display-1 text-center">
              {{ `Couldn't find any products.` }}
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <!--Categories & Products (mobile) -->
    <div class="d-block d-md-none">
      <!-- TODO: category list -->

      <!-- Products -->
      <ProductSearch />

      <v-sheet elevation="2" class="pa-4">
        <div v-if="loading" class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <ProductList v-else-if="products.length > 0" :products="products" />
        <p v-else class="display-1 text-center">
          {{ `Couldn't find any products.` }}
        </p>
      </v-sheet>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import ProductSearch from '@/components/Products/ProductSearch.vue';
import ProductList from '@/components/Products/ProductList.vue';
import CategoryList from '@/components/Categories/CategoryList.vue';

@Component({
  metaInfo: {
    title: 'Products'
  },

  components: {
    ProductSearch,
    ProductList,
    CategoryList
  }
})
export default class Products extends Vue {
  loading = false;
  categoriesLoading = false;

  // TODO: get categoryName from route and display products based on that

  get products() {
    return this.$store.getters.getProducts;
  }
  get categories() {
    return this.$store.getters.getCategories;
  }

  mounted() {
    this.fetchProducts();
    this.fetchCategories();
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
  async fetchCategories() {
    try {
      this.categoriesLoading = true;

      await this.$store.dispatch('fetchCategories');
    } catch (error) {
      console.error(error);
    }

    this.categoriesLoading = false;
  }
}
</script>
