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

  mutations: {},

  getters: {
    getProducts(state) {
      return state.products;
    }
  },

  actions: {}
};

export default products;
