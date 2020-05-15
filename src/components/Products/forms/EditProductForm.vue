<template>
  <v-card>
    <v-form @submit.prevent="handleEditProduct">
      <v-card-title>
        {{ 'Edit product' }}
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              type="text"
              label="Product name"
              v-model="name"
              :error-messages="getNameErrors"
              outlined
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              type="text"
              label="Product description"
              v-model="description"
              :error-messages="getDescriptionErrors"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn @click="callback" :disabled="isSubmitting" color="secondary">
          <v-icon class="mr-1">
            {{ 'mdi-chevron-left' }}
          </v-icon>

          {{ 'Cancel' }}
        </v-btn>

        <v-spacer />

        <v-btn type="submit" :loading="isSubmitting" color="primary">
          {{ 'Make changes' }}

          <v-icon class="ml-2">
            {{ 'mdi-content-save' }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';

import { Product } from '@/types';

@Component({
  validations: () => ({
    name: { required },
    description: { required }
  })
})
export default class EditProductForm extends Vue {
  @Prop({
    type: Object,
    required: false
  })
  readonly product: Product | null | undefined;
  @Prop({
    type: Function,
    required: false
  })
  readonly callback: Function | undefined;

  isSubmitting = false;

  name = '';
  description = '';

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

  mounted() {
    if (this.product) {
      this.name = this.product.name || '';
      this.description = this.product.description || '';
    }
  }

  async handleEditProduct() {
    this.$v.$touch();
    if (this.$v.$pending || this.$v.$error) {
      return;
    }

    try {
      this.isSubmitting = true;

      if (this.product) {
        await this.$store.dispatch('editProduct', {
          id: this.product._id,
          name: this.name,
          description: this.description,
          starterPrice: this.product.starterPrice,
          buyoutPrice: this.product.buyoutPrice,
          category:
            this.product.category && this.product.category.name
              ? this.product.category.name
              : undefined
        });
      } else {
        return;
      }

      this.name = '';
      this.description = '';
      this.$v.$reset();
    } catch (error) {
      console.error(error);
    }

    if (this.callback) this.callback();
    this.isSubmitting = false;
  }
}
</script>
