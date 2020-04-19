<template>
  <div>
    {{ JSON.stringify(product) }}
  </div>
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
