<template>
  <div class="d-none d-md-block">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.url"
      class="navlink bidside-link bidside-link-white font-weight-bold"
    >
      {{ link.label }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class HeaderNavigationDesktop extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly links!: {
    label: string;
    url: string;
  }[];
}
</script>

<style lang="scss" scoped>
.navlink {
  position: relative;

  + .navlink {
    margin-left: 25px;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: -17px;
      width: 2px;
      height: 100%;
      background-color: white;
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
