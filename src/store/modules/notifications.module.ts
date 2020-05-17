import { Module } from 'vuex';
import axios from '@/lib/axios';

import { Notification } from '@/types';

// config
import { baseURL } from '@/config';

const notifications: Module<
  {
    notificationCount: number;
    notifications: Notification[];
  },
  {}
> = {
  state: {
    notificationCount: 0,
    notifications: []
  },

  getters: {
    getNotificationCount(state) {
      return state.notifications.length;
    },

    getNotifications(state) {
      return state.notifications;
    }
  },

  mutations: {
    setNotificationCount(
      state,
      { notificationCount }: { notificationCount: number }
    ) {
      state.notificationCount = notificationCount;
    },

    setNotifications(
      state,
      { notifications }: { notifications: Notification[] }
    ) {
      state.notifications = notifications;
    }
  },

  actions: {
    async fetchNotificationCount({ commit }) {
      const response = await axios.get(`${baseURL}/notifications`);

      commit('setNotificationCount', {
        notificationCount: !isNaN(response.data) ? response.data : 0
      });
    },

    async fetchNotifications({ commit }) {
      const response = await axios.get(`${baseURL}/notifications/list`);

      if (Array.isArray(response.data)) {
        commit('setNotifications', {
          notifications: response.data
        });
      }
    }
  }
};

export default notifications;
