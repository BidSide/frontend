import { Module } from 'vuex';
import axios from '@/lib/axios';

import { PublicProfileInterface } from '@/types';

// config
import { baseURL } from '@/config';

const publicProfile: Module<
  {
    publicProfile: PublicProfileInterface | null;
  },
  {}
> = {
  state: {
    publicProfile: null
  },

  getters: {
    getPublicProfile(state) {
      return state.publicProfile;
    }
  },

  mutations: {
    setPublicProfile(
      state,
      { publicProfile }: { publicProfile: PublicProfileInterface | null }
    ) {
      state.publicProfile = publicProfile;
    }
  },

  actions: {
    async fetchPublicProfile({ commit }, { id }: { id: string }) {
      const response = await axios.get(`${baseURL}/profile/public/${id}`);

      if (response.data) {
        commit('setPublicProfile', {
          publicProfile: response.data
        });
      }
    },

    async subscribeToProfile({ commit }, { id }: { id: string }) {
      await axios.post(`${baseURL}/profile/subscribe/${id}`);

      commit('addSubscription', { id });
    },

    async unsubscribeFromProfile({ commit }, { id }: { id: string }) {
      await axios.delete(`${baseURL}/profile/subscribe/${id}`);

      commit('removeSubscription', { id });
    }
  }
};

export default publicProfile;
