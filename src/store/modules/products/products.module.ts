import { Module } from 'vuex';
import axios from 'axios';

import { Product, Category } from '@/types';

// config
import { baseURL } from '@/config';

import { ProductsState } from './products.types';

const products: Module<ProductsState, {}> = {
  state: {
    products: [],
    categories: []
  },

  mutations: {
    setProducts(state, { products }: { products: Product[] }) {
      state.products = products;
    },

    setCategories(state, { categories }: { categories: Category[] }) {
      state.categories = categories;
    }
  },

  getters: {
    getProducts(state) {
      return state.products;
    },

    getCategories(state) {
      return state.categories;
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      // TODO: fetch produts by category (optionally)
      const response = await axios.get(`${baseURL}/product`);

      if (Array.isArray(response.data)) {
        commit('setProducts', {
          products: response.data
        });
      }
    },

    async fetchCategories({ commit }) {
      const response = await axios.get(`${baseURL}/categories`);

      if (Array.isArray(response.data)) {
        commit('setCategories', {
          categories: response.data
        });
      }
    }
  }
};

export default products;
