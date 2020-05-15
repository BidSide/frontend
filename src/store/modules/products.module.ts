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

  mutations: {
    setProducts(state, { products }: { products: Product[] }) {
      state.products = products;
    },

    setCategories(state, { categories }: { categories: Category[] }) {
      state.categories = categories;
    },

    setProduct(state, { product }: { product: Product }) {
      state.product = product;
    },

    addProduct(state, { product }: { product: Product }) {
      state.products.push(product);
    },

    deleteProduct(state, { id }: { id: string }) {
      state.products = state.products.filter(prod => prod._id !== id);
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
          products: response.data.filter(product => !product.sold)
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
    },

    async addProduct(
      { commit, state },
      {
        name,
        description,
        starterPrice,
        buyoutPrice,
        category
      }: {
        name: string;
        description: string;
        starterPrice: number;
        buyoutPrice: number;
        category: string;
      }
    ) {
      const response = await axios.post(`${baseURL}/product`, {
        name,
        description,
        starterPrice: Number(starterPrice),
        buyoutPrice: Number(buyoutPrice),
        category
      });

      if (response.data) {
        commit('addProduct', {
          product: {
            ...response.data,
            category: state.categories.find(cat => cat._id === category)
          }
        });
      }
    },

    async editProduct(
      _,
      {
        id,
        name,
        description,
        starterPrice,
        buyoutPrice,
        category
      }: {
        id: string;
        name: string;
        description: string;
        starterPrice: number;
        buyoutPrice: number;
        category: string;
      }
    ) {
      await axios.put(`${baseURL}/product/${id}`, {
        name,
        description,
        starterPrice: Number(starterPrice),
        buyoutPrice: Number(buyoutPrice),
        category
      });
    },

    async bidProduct(
      { commit, state },
      { id, amount }: { id: string; amount: number }
    ) {
      const response = await axios.post(`${baseURL}/product/${id}/bid`, {
        amount: Number(amount)
      });

      if (response.data) {
        commit('setProduct', {
          product: {
            ...state.product,
            currentPrice: response.data.currentPrice,
            sold: response.data.sold
          }
        });
      }
    },

    async buyoutProduct({ commit, state }, { id }: { id: string }) {
      await axios.post(`${baseURL}/product/${id}/buyout`);

      commit('setProduct', {
        product: {
          ...state.product,
          sold: true
        }
      });
    }
  }
};

export default products;
