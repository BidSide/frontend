<template>
  <div>
    <v-list :dense="$vuetify.breakpoint.xsOnly">
      <v-list-item
        v-for="(product, index) in products"
        :key="index"
        @click="$router.push(`/product/${product._id}`)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ `${product.name} ${product.sold ? '(SOLD)' : ''}` }}
          </v-list-item-title>

          <v-list-item-subtitle class="caption">
            <span v-if="product.currentPrice" class="font-weight-bold">
              {{ 'Highest bid: ' }}
              {{ product.currentPrice.amount }}
              <v-icon small color="primary">
                {{ 'mdi-currency-usd-circle' }}
              </v-icon>
            </span>
            <span v-else>
              {{ 'No bids yet.' }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex flex-row">
          <v-btn
            @click.stop="handleEditDialogOpen(product)"
            icon
            :disabled="Boolean(product.sold || product.currentPrice)"
          >
            <v-icon color="primary">
              {{ 'mdi-pencil' }}
            </v-icon>
          </v-btn>

          <v-btn
            v-if="deleteConfirmId !== product._id"
            @click.stop="deleteConfirmId = product._id"
            icon
            :disabled="product.sold"
            class="ml-2"
          >
            <v-icon color="error">
              {{ 'mdi-delete-forever' }}
            </v-icon>
          </v-btn>
          <v-btn
            v-else
            @click.stop="handleDeleteProduct(product._id)"
            :loading="deletingItemId === product._id"
            icon
            class="ml-2"
          >
            <v-icon color="error">
              {{ 'mdi-check' }}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog v-model="editProductDialogOpen" max-width="600">
      <EditProductForm
        :product="editingProduct"
        :callback="handleEditDialogClose"
      />
    </v-dialog>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Product } from '@/types';

// Components
import EditProductForm from '@/components/Products/forms/EditProductForm.vue';

@Component({
  components: {
    EditProductForm
  }
})
export default class MyProducts extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly products!: Product[];

  errorSnackbar = false;
  errorText = '';

  editProductDialogOpen = false;
  editingProduct: Product | null = null;
  deleteConfirmId = '';
  deletingItemId = '';

  handleEditDialogOpen(product: Product) {
    this.editingProduct = product;
    this.editProductDialogOpen = true;
  }

  handleEditDialogClose() {
    this.editProductDialogOpen = false;
    this.editingProduct = null;
  }

  async handleDeleteProduct(id: string) {
    try {
      this.deletingItemId = id;

      await this.$store.dispatch('deleteProduct', { id });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.deletingItemId = '';
  }
}
</script>
