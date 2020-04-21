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
                {{ 'Balance: ' + profile.wallet }}
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { required, minValue, integer } from 'vuelidate/lib/validators';

@Component({
  metaInfo: {
    title: 'Profile'
  },

  validations: {
    topupValue: { required, minValue: minValue(1), integer }
  }
})
export default class Profile extends Vue {
  loading = false;
  topupLoading = false;
  topupDialogOpen = false;

  topupValue = 0;

  get profile() {
    return this.$store.getters.getProfile;
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
    this.fetchProfile();
  }

  async fetchProfile() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProfile');
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
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
    } catch (error) {
      console.error(error);
    }

    this.topupLoading = false;
  }
}
</script>
