<template>
  <div>
    <v-card>
      <v-form @submit.prevent="addNewProduct">
        <v-card-title>
          {{ 'I want to sell my product' }}
        </v-card-title>
        <v-divider />

        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                type="text"
                label="Name of your product"
                v-model="name"
                :error-messages="getNameErrors"
                outlined
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                type="text"
                label="Description of your product"
                v-model="description"
                :error-messages="getDescriptionErrors"
                outlined
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                label="Starter price of your product"
                append-icon="mdi-currency-usd-circle"
                v-model="starterPrice"
                :error-messages="getStarterPriceErrors"
                outlined
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                label="Buyout price of your product"
                append-icon="mdi-currency-usd-circle"
                v-model="buyoutPrice"
                :error-messages="getBuyoutPriceErrors"
                outlined
              />
            </v-col>

            <v-col cols="12">
              <v-select
                :loading="categoriesLoading"
                :disabled="categoriesLoading"
                :items="categoryItems"
                v-model="category"
                :error-messages="getCategoryErrors"
                label="Select a category..."
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" :loading="isSubmitting" color="primary">
            {{ 'List my product' }}

            <v-icon class="ml-2">
              {{ 'mdi-plus-circle-outline' }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { required, minValue, integer } from 'vuelidate/lib/validators';

import { Category } from '@/types';

@Component({
  validations: () => ({
    name: { required },
    description: { required },
    starterPrice: { required, integer, minValue: minValue(1) },
    buyoutPrice: { required, integer, minValue: minValue(1) },
    category: { required }
  })
})
export default class AddProductForm extends Vue {
  @Prop({
    type: Function,
    required: false
  })
  readonly callback: Function | undefined;

  errorSnackbar = false;
  errorText = '';

  categoriesLoading = false;
  isSubmitting = false;

  name = '';
  description = '';
  starterPrice = 0;
  buyoutPrice = 0;
  category = '';

  get getNameErrors() {
    const errors: string[] = [];
    if (this.$v.name && this.$v.name.$dirty) {
      !this.$v.name.required && errors.push('Name is required.');
    }
    return errors;
  }
  get getDescriptionErrors() {
    const errors: string[] = [];
    if (this.$v.description && this.$v.description.$dirty) {
      !this.$v.description.required && errors.push('Description is required.');
    }
    return errors;
  }
  get getStarterPriceErrors() {
    const errors: string[] = [];
    if (this.$v.starterPrice && this.$v.starterPrice.$dirty) {
      !this.$v.starterPrice.required &&
        errors.push('Starter price is required.');
      !this.$v.starterPrice.minValue &&
        errors.push('Starter price must be higher than 0.');
    }
    return errors;
  }
  get getBuyoutPriceErrors() {
    const errors: string[] = [];
    if (this.$v.buyoutPrice && this.$v.buyoutPrice.$dirty) {
      !this.$v.buyoutPrice.required && errors.push('Buyout price is required.');
      !this.$v.buyoutPrice.minValue &&
        errors.push('Buyout price must be higher than 0.');
    }
    return errors;
  }
  get getCategoryErrors() {
    const errors: string[] = [];
    if (this.$v.category && this.$v.category.$dirty) {
      !this.$v.category.required && errors.push('Category is required.');
    }
    return errors;
  }

  get categories(): Category[] {
    return this.$store.getters.getCategories;
  }
  get categoryItems() {
    return this.categories.map(category => ({
      text: category.name,
      value: category._id
    }));
  }

  mounted() {
    this.fetchCategories();
  }

  async addNewProduct() {
    this.$v.$touch();
    if (this.$v.$pending || this.$v.$error) {
      return;
    }

    try {
      this.isSubmitting = true;
      await this.$store.dispatch('addProduct', {
        name: this.name,
        description: this.description,
        starterPrice: this.starterPrice,
        buyoutPrice: this.buyoutPrice,
        category: this.category
      });

      this.name = '';
      this.description = '';
      this.starterPrice = 0;
      this.buyoutPrice = 0;
      this.category = '';
      this.$v.$reset();
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    if (this.callback) this.callback();
    this.isSubmitting = false;
  }

  async fetchCategories() {
    try {
      this.categoriesLoading = true;

      await this.$store.dispatch('fetchCategories');
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.categoriesLoading = false;
  }
}
</script>
