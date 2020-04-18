import { Module } from 'vuex';
import axios from 'axios';

// config
import { baseURL } from '@/config';

import { ProductsState } from './products.types';

const products: Module<ProductsState, {}> = {
  state: {
    products: []
  },

  mutations: {},

  getters: {
    getProducts(state) {
      return state.products;
    }
  },

  actions: {}
};

export default products;
