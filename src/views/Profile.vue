<template>
  <v-container class="fill-height">
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="10">
        <div v-if="loading" class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <v-sheet v-else-if="profile" elevation="2" class="pa-4">
          <v-row align="center">
            <v-col cols="12" sm="6" md="8">
              <p class="display-1 mb-0">
                {{ profile.firstName + ' ' + profile.lastName }}
              </p>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p class="title text-end mb-0">
                {{ 'Balance: ' + profile.info.wallet }}
                <v-icon small color="primary">
                  {{ 'mdi-currency-usd-circle' }}
                </v-icon>
              </p>
            </v-col>
          </v-row>

          <div class="d-flex justify-end mt-2">
            <v-btn color="primary" @click.stop="topupDialogOpen = true">
              {{ 'Top-up balance' }}

              <v-icon small class="ml-3">
                {{ 'mdi-wallet-plus' }}
              </v-icon>
            </v-btn>
          </div>

          <v-divider class="mt-8 mb-8" />

          <v-tabs v-model="tabValue" class="mb-4" grow>
            <v-tab>
              {{ 'My products' }}
            </v-tab>

            <v-tab>
              {{ 'Transaction history' }}
            </v-tab>
          </v-tabs>

          <div v-if="tabValue === 0">
            <div v-if="myProductsLoading" class="d-flex justify-center">
              <v-progress-circular indeterminate color="primary" />
            </div>

            <MyProducts
              v-else-if="myProducts.length > 0"
              :products="myProducts"
            />

            <p v-else class="display-1 text-center">
              {{ `You haven't posted any products yet.` }}
            </p>
          </div>

          <div v-else-if="tabValue === 1">
            <MyTransactions
              v-if="myTransactions.length > 0"
              :transactions="myTransactions"
            />

            <p v-else class="display-1 text-center">
              {{ 'Your transaction history is empty.' }}
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-model="topupDialogOpen" max-width="300">
      <v-form @submit.prevent="handleTopup">
        <v-card>
          <v-card-title>
            {{ 'Top-up balance' }}
          </v-card-title>

          <v-card-text class="pb-0">
            <v-text-field
              type="number"
              label="Amount"
              v-model="topupValue"
              :error-messages="topupValueErrors"
              outlined
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn type="submit" :loading="topupLoading" color="primary">
              {{ 'Top-up balance' }}

              <v-icon small class="ml-3">
                {{ 'mdi-wallet-plus' }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>

    <v-snackbar v-model="topupSnackbar" right color="success">
      {{ 'Successful top-up!' }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { required, minValue, integer } from 'vuelidate/lib/validators';

// Components
import MyProducts from '@/components/Profile/MyProducts.vue';
import MyTransactions from '@/components/Profile/MyTransactions.vue';

@Component({
  metaInfo: {
    title: 'Profile'
  },

  components: {
    MyProducts,
    MyTransactions
  },

  validations: {
    topupValue: { required, minValue: minValue(1), integer }
  }
})
export default class Profile extends Vue {
  loading = false;
  myProductsLoading = false;
  topupLoading = false;
  topupDialogOpen = false;
  tabValue = 0;

  topupSnackbar = false;
  errorSnackbar = false;
  errorText = '';

  topupValue = 0;

  get profile() {
    return this.$store.getters.getProfile;
  }

  get myProducts() {
    return this.$store.getters.getMyProducts;
  }

  get myTransactions() {
    return this.$store.getters.getMyTransactions;
  }

  get topupValueErrors() {
    const errors: string[] = [];
    if (this.$v.topupValue && this.$v.topupValue.$dirty) {
      !this.$v.topupValue.required &&
        errors.push('Please enter the top-up amount.');
      !this.$v.topupValue.minValue &&
        errors.push('Amount must be higher than 0.');
    }
    return errors;
  }

  mounted() {
    this.fetchProfile().then(() => {
      this.fetchMyProducts();
    });
  }

  async fetchProfile() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProfile');
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

  async fetchMyProducts() {
    try {
      this.myProductsLoading = true;

      await this.$store.dispatch('fetchMyProducts');
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.myProductsLoading = false;
  }

  async handleTopup() {
    this.$v.$touch();
    if (this.$v.$pending || this.$v.$error) {
      return;
    }

    try {
      this.topupLoading = true;

      await this.$store.dispatch('incrementBalance', {
        amount: this.topupValue
      });

      this.topupDialogOpen = false;
      this.topupValue = 0;
      this.$v.$reset();

      this.topupSnackbar = true;
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.topupLoading = false;
  }
}
</script>
