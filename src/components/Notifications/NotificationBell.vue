<template>
  <div>
    <v-btn text icon class="mr-3">
      <v-icon v-if="notificationCount > 0">
        {{ 'mdi-bell-ring' }}
      </v-icon>
      <v-icon v-else class="notification-bell">
        {{ 'mdi-bell' }}
      </v-icon>

      <span
        v-if="notificationCount > 0"
        class="notification-bell-number text--white font-weight-black"
      >
        {{ notificationCount }}
      </span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NotificationBell extends Vue {
  get notificationCount() {
    return this.$store.getters.getNotificationCount;
  }

  mounted() {
    this.fetchNotificationCount();
  }

  async fetchNotificationCount() {
    try {
      await this.$store.dispatch('fetchNotificationCount');
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-bell {
  position: relative;
}

.notification-bell-number {
  position: absolute;
  right: 10px;
  bottom: -5px;
  background-color: $primary;
  border-radius: 50%;
  padding: 1px;
}
</style>
