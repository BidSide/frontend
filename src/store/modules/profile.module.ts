import { Module } from 'vuex';
import axios from '@/lib/axios';

import { Profile, Product } from '@/types';

// config
import { baseURL } from '@/config';

const profile: Module<
  {
    profile: Profile | null;
    myProducts: Product[];
  },
  {}
> = {
  state: {
    profile: null,
    myProducts: []
  },

  mutations: {
    setProfile(state, { profile }: { profile: Profile }) {
      state.profile = profile;
    },

    setMyProducts(state, { products }: { products: Product[] }) {
      state.myProducts = products;
    },

    updateBalance(state, { newBalance }: { newBalance: number }) {
      if (state.profile) state.profile.info.wallet = newBalance;
    }
  },

  getters: {
    getProfile(state) {
      return state.profile;
    },

    getMyProducts(state) {
      return state.myProducts;
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

    async fetchMyProducts({ commit, state }) {
      const response = await axios.get(`${baseURL}/product`, {
        params: {
          profile: state.profile && state.profile.info._id
        }
      });

      if (Array.isArray(response.data)) {
        commit('setMyProducts', {
          products: response.data
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
