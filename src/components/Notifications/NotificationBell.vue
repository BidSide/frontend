<template>
  <v-menu
    v-model="notificationMenuOpen"
    close-on-click
    close-on-content-click
    offset-y
    offset-overflow
    fixed
  >
    <template #activator="{ on }">
      <v-btn
        text
        icon
        class="mr-3"
        v-on="on"
        @click="fetchNotifications"
        :loading="notificationsLoading"
      >
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
    </template>

    <v-list v-if="!notificationsLoading">
      <v-list-item v-if="sortedNotifications.length < 1">
        {{ 'No new notifications.' }}
      </v-list-item>

      <v-list-item
        v-for="(notification, index) in sortedNotifications"
        :key="index"
        @click="markNotificationAsSeen(notification._id)"
      >
        <v-list-item-title
          class="notification notification-new font-weight-bold"
        >
          {{ notification.message }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  setIntervalAsync,
  SetIntervalAsyncTimer,
  clearIntervalAsync
} from 'set-interval-async/fixed';

import { Notification } from '@/types';

@Component
export default class NotificationBell extends Vue {
  notificationMenuOpen = false;
  notificationsLoading = false;

  notificationInterval: SetIntervalAsyncTimer | null = null;

  get notificationCount(): number {
    return this.$store.getters.getNotificationCount;
  }
  get notifications(): Notification[] {
    return this.$store.getters.getNotifications;
  }

  get sortedNotifications(): Notification[] {
    return this.notifications.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (b.createdAt < a.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  mounted() {
    this.fetchNotificationCount();

    // fetch notifications every minute
    this.notificationInterval = setIntervalAsync(async () => {
      await this.fetchNotificationCount();
    }, 30000);
  }

  beforeDestroy() {
    if (this.notificationInterval) {
      clearIntervalAsync(this.notificationInterval);
    }
  }

  async fetchNotificationCount() {
    try {
      await this.$store.dispatch('fetchNotificationCount');
    } catch (error) {
      console.error(error);
    }
  }

  async fetchNotifications() {
    this.notificationsLoading = true;

    try {
      await this.$store.dispatch('fetchNotifications');
    } catch (error) {
      console.error(error);
    }

    this.notificationsLoading = false;
  }

  async markNotificationAsSeen(id: string) {
    try {
      await this.$store.dispatch('markNotificationAsSeen', { id });
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

.notification {
  display: flex;
  align-items: center;

  &-new {
    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: $primary;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
