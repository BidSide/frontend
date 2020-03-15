<template>
  <div>
    <!-- desktop -->
    <div class="d-none d-md-block">
      <HeaderNavigationDesktop :routes="routes" />
    </div>

    <!-- mobile -->
    <div class="d-block d-md-none">
      <HeaderNavigationMobile @openDrawer="$emit('openDrawer')" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// Components
import HeaderNavigationDesktop from './HeaderNavigationDesktop.vue';
import HeaderNavigationMobile from './HeaderNavigationMobile.vue';

@Component({
  components: {
    HeaderNavigationDesktop,
    HeaderNavigationMobile
  }
})
export default class HeaderNavigation extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly routes!: [];
}
</script>
