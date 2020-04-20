import { Module } from 'vuex';
import axios from '@/lib/axios';

import { Product, Category } from '@/types';

// config
import { baseURL } from '@/config';

const products: Module<
  {
    products: Product[];
    categories: Category[];
    product: Product | null;
  },
  {}
> = {
  state: {
    products: [],
    categories: [],
    product: null
  },

  mutations: {
    setProducts(state, { products }: { products: Product[] }) {
      state.products = products;
    },

    setCategories(state, { categories }: { categories: Category[] }) {
      state.categories = categories;
    },

    setProduct(state, { product }: { product: Product }) {
      state.product = product;
    }
  },

  getters: {
    getProducts(state) {
      return state.products;
    },

    getCategories(state) {
      return state.categories;
    },

    getProduct(state) {
      return state.product;
    }
  },

  actions: {
    async fetchProducts(
      { commit },
      payload?: { categoryName?: string; searchTerm?: string }
    ) {
      const response = await axios.get(`${baseURL}/product`, {
        params: {
          category:
            payload && payload.categoryName ? payload.categoryName : undefined,
          search: payload && payload.searchTerm ? payload.searchTerm : undefined
        }
      });

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
    },

    async fetchProduct({ commit }, { id }: { id: string }) {
      const response = await axios.get(`${baseURL}/product/${id}`);

      if (response.data) {
        commit('setProduct', {
          product: response.data
        });
      }
    }
  }
};

export default products;
