<template>
  <v-card>
    <v-form @submit.prevent="addNewProduct">
      <v-card-title>
        {{ 'Add new product' }}
      </v-card-title>

      <v-card-text>
        form here
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn type="submit" :loading="isSubmitting" color="primary">
          {{ 'Add my product' }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class AddProductForm extends Vue {
  @Prop({
    type: Function,
    required: false
  })
  readonly callback: Function | undefined;

  isSubmitting = false;

  async addNewProduct() {
    try {
      this.isSubmitting = true;
      //   await this.$store.dispatch('addProduct', {
      //     // values
      //   });
    } catch (error) {
      console.error(error);
    }

    this.isSubmitting = false;
    if (this.callback) this.callback();
  }
}
</script>
