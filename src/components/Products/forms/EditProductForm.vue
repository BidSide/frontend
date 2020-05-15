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
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Category, Product } from '@/types';

@Component
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

  categoriesLoading = false;
  isSubmitting = false;

  name = '';

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

    if (this.product) {
      this.name = this.product.name;
    }
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
