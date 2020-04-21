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
    },

    updateBalance(state, { newBalance }: { newBalance: number }) {
      if (state.profile) state.profile.info.wallet = newBalance;
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
        const { profile, ...rest } = response.data;

        commit('setProfile', {
          profile: {
            info: profile,
            ...rest
          }
        });
      }
    },

    async incrementBalance({ commit }, { amount }: { amount: number }) {
      const response = await axios.post(`${baseURL}/profile/topup`, {
        amount: Number(amount)
      });

      if (response.data) {
        commit('updateBalance', {
          newBalance: response.data.wallet
        });
      }
    }
  }
};

export default profile;
