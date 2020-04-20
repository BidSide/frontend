import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Modules
import auth from './modules/auth';
import products from './modules/products';
import profile from './modules/profile';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    products,
    profile
  }
});
