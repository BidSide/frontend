<template>
  <v-container>
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="10">
        <v-sheet elevation="2" class="pa-4">
          <v-btn color="primary mb-4" @click="$router.push('/products')">
            <v-icon class="mr-1">
              {{ 'mdi-chevron-left' }}
            </v-icon>

            {{ 'Back to products' }}
          </v-btn>

          <!-- Product info -->
          <div v-if="loading" class="d-flex justify-center">
            <v-progress-circular indeterminate color="primary" />
          </div>
          <v-card v-else-if="product" outlined class="pa-2">
            <v-card-title>
              {{ product.name }}
            </v-card-title>

            <v-card-subtitle>
              {{ product.category.name }}
            </v-card-subtitle>

            <v-card-text>
              {{ product.description }}
            </v-card-text>

            <v-divider class="" />

            <div class="d-block d-sm-flex">
              <v-card-text>
                <div class="d-flex flex-column mb-4">
                  <span>
                    {{ 'Starter price:' }}
                  </span>
                  <span class="subtitle-1">
                    {{ product.starterPrice }}
                    <v-icon small color="secondary">
                      {{ 'mdi-currency-usd-circle' }}
                    </v-icon>
                  </span>
                </div>

                <div class="d-flex flex-column">
                  <span>
                    {{ 'Highest bid:' }}
                  </span>
                  <span
                    v-if="product.currentPrie > 0"
                    class="font-weight-bold subtitle-1"
                  >
                    {{ product.currentPrice }}
                    <v-icon small color="secondary">
                      {{ 'mdi-currency-usd-circle' }}
                    </v-icon>
                  </span>
                  <span v-else class="caption mb-1">
                    {{ 'No bids yet.' }}
                  </span>
                </div>

                <div class="d-flex flex-column">
                  <span>
                    {{ 'Buyout price:' }}
                  </span>
                  <span class="font-weight-bold subtitle-1">
                    {{ product.buyoutPrice }}
                    <v-icon small color="primary">
                      {{ 'mdi-currency-usd-circle' }}
                    </v-icon>
                  </span>
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-end flex-sm-column">
                <v-btn
                  color="secondary"
                  width="100"
                  class="d-flex justify-space-between"
                >
                  {{ 'Bid' }}

                  <v-icon small>
                    {{ 'mdi-currency-usd-circle' }}
                  </v-icon>
                </v-btn>

                <v-btn
                  color="primary ml-4 ml-sm-0 mt-sm-4"
                  width="100"
                  class="d-flex justify-space-between"
                >
                  {{ 'Buyout' }}

                  <v-icon small>
                    {{ 'mdi-currency-usd-circle' }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: {
    title: 'Product'
  }
})
export default class ProductPage extends Vue {
  loading = false;

  get product() {
    return this.$store.getters.getProduct;
  }

  mounted() {
    this.fetchProduct();
  }

  async fetchProduct() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProduct', {
        id: this.$route.params.id
      });
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
</script>
