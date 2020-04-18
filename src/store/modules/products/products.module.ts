import { Module } from 'vuex';
import axios from 'axios';

import { Product } from '@/types';

// config
import { baseURL } from '@/config';

import { ProductsState } from './products.types';

const products: Module<ProductsState, {}> = {
  state: {
    products: []
  },

  mutations: {
    setProducts(state, { products }: { products: Product[] }) {
      state.products = products;
    }
  },

  getters: {
    getProducts(state) {
      return state.products;
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get(`${baseURL}/product`);

      if (Array.isArray(response.data)) {
        commit('setProducts', {
          products: response.data
        });
      }
    }
  }
};

export default products;
