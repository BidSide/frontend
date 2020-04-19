<template>
  <div>
    <p>
      {{ $route.params.categoryName || 'All' }}
    </p>

    <p>
      {{ $route.params.searchTerm }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: {
    title: 'Search'
  }
})
export default class Search extends Vue {}
</script>
