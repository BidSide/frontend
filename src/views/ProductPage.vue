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
              <p v-if="seller" class="font-italic">
                <router-link
                  :to="{ path: `/profile/${seller.id}` }"
                  class="bidside-link bidside-link-primary"
                >
                  {{ `${seller.name}'s product` }}
                </router-link>
              </p>
              <p v-else class="font-italic">
                {{ `Anonymous' product` }}
              </p>

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
                    {{
                      highestBidderName
                        ? `Highest bid (${highestBidderName}):`
                        : 'Highest bid:'
                    }}
                  </span>
                  <span
                    v-if="product.currentPrice"
                    class="font-weight-bold subtitle-1"
                  >
                    {{ product.currentPrice.amount }}
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
                <v-tooltip left>
                  <template #activator="{ on }">
                    <span v-on="on">
                      <v-btn
                        @click="bidDialogOpen = true"
                        color="secondary"
                        width="100"
                        class="d-flex justify-space-between pr-2 pl-2"
                        :disabled="
                          isOwnProduct || isHighestBidder || product.sold
                        "
                      >
                        {{ 'Bid' }}

                        <v-icon small>
                          {{ 'mdi-currency-usd-circle' }}
                        </v-icon>
                      </v-btn>
                    </span>
                  </template>

                  <span v-if="isHighestBidder">
                    {{ 'You are the highest bidder!' }}
                  </span>
                  <span v-else-if="isOwnProduct">
                    {{ 'You cannot buy your own product!' }}
                  </span>
                  <span v-else>
                    {{ 'Click to make bid' }}
                  </span>
                </v-tooltip>

                <v-tooltip left>
                  <template #activator="{ on }">
                    <span v-on="on">
                      <v-btn
                        @click="handleBuyoutAction"
                        :loading="buyoutLoading"
                        color="primary"
                        width="100"
                        class="d-flex justify-space-between pr-2 pl-2 ml-4 ml-sm-0 mt-sm-4"
                        :disabled="isOwnProduct || product.sold"
                      >
                        {{ 'Buyout' }}

                        <v-icon small>
                          {{ 'mdi-currency-usd-circle' }}
                        </v-icon>
                      </v-btn>
                    </span>
                  </template>

                  <span v-if="isOwnProduct">
                    {{ 'You cannot buy your own product!' }}
                  </span>
                  <span v-else>
                    {{ 'Click to buy' }}
                  </span>
                </v-tooltip>
              </v-card-actions>
            </div>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-model="bidDialogOpen" max-width="300">
      <v-card>
        <v-card-title>
          {{ 'Bid amount' }}
        </v-card-title>

        <v-card-text class="pb-0">
          <v-text-field
            type="number"
            label="Bid amount"
            v-model="bidValue"
            outlined
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="handleBidAction"
            :loading="bidLoading"
            color="secondary"
          >
            {{ 'Make bid' }}
            <v-icon small class="ml-2">
              {{ 'mdi-currency-usd-circle' }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Product, Profile } from '@/types';

@Component({
  metaInfo: {
    title: 'Product'
  }
})
export default class ProductPage extends Vue {
  loading = false;

  errorSnackbar = false;
  errorText = '';

  bidDialogOpen = false;
  bidLoading = false;
  buyoutLoading = false;

  bidValue = 0;

  get product(): Product | null {
    return this.$store.getters.getProduct;
  }
  get token(): string | null {
    return this.$store.getters.getJwt;
  }
  get profile(): Profile | null {
    return this.$store.getters.getProfile;
  }

  get seller() {
    if (this.product && this.product.profile) {
      return {
        id: this.product.profile._id,
        name: `${this.product.profile.firstName} ${this.product.profile.lastName}`
      };
    } else {
      return undefined;
    }
  }

  get highestBidderName(): string | undefined {
    if (
      this.product &&
      this.product.currentPrice &&
      this.product.currentPrice.user &&
      this.product.currentPrice.user.firstName &&
      this.product.currentPrice.user.lastName
    ) {
      return `${this.product.currentPrice.user.firstName} ${this.product.currentPrice.user.lastName}`;
    } else {
      return undefined;
    }
  }

  get isOwnProduct(): boolean {
    if (
      this.profile &&
      this.profile.info &&
      this.product &&
      this.product.profile &&
      this.profile.info.user === this.product.profile._id
    ) {
      return true;
    } else {
      return false;
    }
  }
  get isHighestBidder(): boolean {
    if (
      this.profile &&
      this.profile.info &&
      this.product &&
      this.product.currentPrice &&
      this.product.currentPrice.user &&
      this.profile.info.user === this.product.currentPrice.user._id
    ) {
      return true;
    } else {
      return false;
    }
  }

  mounted() {
    this.fetchAll();
  }

  async fetchAll() {
    this.loading = true;

    await this.fetchProduct();
    if (this.token) await this.fetchProfile();

    this.loading = false;
  }

  async fetchProduct() {
    try {
      await this.$store.dispatch('fetchProduct', {
        id: this.$route.params.id
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }
  }

  async fetchProfile() {
    try {
      await this.$store.dispatch('fetchProfile');
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }
  }

  async handleBidAction() {
    if (!this.token) {
      this.$router.push('/login');
      return;
    }

    try {
      this.bidLoading = true;

      this.$store.dispatch('bidProduct', {
        id: this.product && this.product._id,
        amount: this.bidValue
      });

      this.bidDialogOpen = false;
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.bidLoading = false;
  }

  async handleBuyoutAction() {
    if (!this.token) {
      this.$router.push('/login');
      return;
    }

    try {
      this.buyoutLoading = true;

      await this.$store.dispatch('buyoutProduct', {
        id: this.product && this.product._id
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.buyoutLoading = false;
  }
}
</script>
