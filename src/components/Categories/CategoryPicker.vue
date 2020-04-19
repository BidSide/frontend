<template>
  <v-select
    :loading="loading"
    :disabled="loading"
    :items="categoryItems"
    v-model="selected"
    label="Categories"
    solo
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

import { Category } from '@/types';

@Component
export default class CategoryPicker extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  readonly loading!: boolean;
  @Prop({
    type: Array,
    required: true
  })
  readonly categories!: Category[];

  selected = 'All';

  get categoryItems() {
    return [
      {
        text: 'All',
        value: 'All'
      }
    ].concat(
      this.categories.map(category => ({
        text: category.name,
        value: category.name
      }))
    );
  }

  @Watch('selected')
  onSelectedChange(newValue: string) {
    if (newValue === 'All') {
      if (this.$router.currentRoute.path !== '/products') {
        this.$router.push('/products');
      }
    } else {
      if (this.$router.currentRoute.path !== `/products/category/${newValue}`) {
        this.$router.push(`/products/category/${newValue}`);
      }
    }
  }

  mounted() {
    if (this.$route.params.categoryName) {
      this.selected = this.$route.params.categoryName;
    }
  }
}
</script>
