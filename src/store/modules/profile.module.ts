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

  getters: {
    getProfile(state) {
      return state.profile;
    },

    getMyProducts(state) {
      return state.myProducts;
    },

    getMyTransactions(state) {
      if (state.profile) {
        return state.profile.transactionLogs;
      } else {
        return [];
      }
    },

    getMySubscriptions(state) {
      if (state.profile) {
        return state.profile.info.subscriptions;
      } else {
        return [];
      }
    }
  },

  mutations: {
    setProfile(state, { profile }: { profile: Profile | null }) {
      state.profile = profile;
    },

    setMyProducts(state, { products }: { products: Product[] }) {
      state.myProducts = products;
    },

    updateBalance(state, { newBalance }: { newBalance: number }) {
      if (state.profile) state.profile.info.wallet = newBalance;
    },

    addProduct(state, { product }: { product: Product }) {
      state.myProducts.push(product);
    },

    deleteProduct(state, { id }: { id: string }) {
      state.myProducts = state.myProducts.filter(prod => prod._id !== id);
    },

    addSubscription(state, { id }: { id: string }) {
      if (state.profile) state.profile.info.subscriptions.push(id);
    },

    removeSubscription(state, { id }: { id: string }) {
      if (state.profile) {
        state.profile.info.subscriptions = state.profile.info.subscriptions.filter(
          sub => sub !== id
        );
      }
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
    },

    async deleteProduct({ commit }, { id }: { id: string }) {
      await axios.delete(`${baseURL}/product/${id}`);

      commit('deleteProduct', {
        id
      });
    }
  }
};

export default profile;
