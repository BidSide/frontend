import { Module } from 'vuex';
import axios from '@/lib/axios';

import { Profile } from '@/types';

// config
import { baseURL } from '@/config';

const profile: Module<
  {
    profile: Profile | null;
  },
  {}
> = {
  state: {
    profile: null
  },

  mutations: {
    setProfile(state, { profile }: { profile: Profile }) {
      state.profile = profile;
    }
  },

  getters: {
    getProfile(state) {
      return state.profile;
    }
  },

  actions: {
    async fetchProfile({ commit }) {
      const response = await axios.get(`${baseURL}/profile`);

      if (response.data) {
        commit('setProfile', {
          profile: response.data
        });
      }
    }
  }
};

export default profile;
