<template>
  <v-list>
    <v-subheader>
      {{ 'Categories' }}
    </v-subheader>

    <v-list-item-group color="primary">
      <v-list-item link exact to="/products">
        <v-list-item-content>
          <v-list-item-title>
            {{ 'All' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(category, index) in categories"
        :key="index"
        link
        :to="{ path: `/products/category/${category.name}` }"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ category.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Category } from '@/types';

@Component
export default class CategoryList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly categories!: Category[];
}
</script>
