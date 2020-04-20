import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Modules
import auth from './modules/auth.module';
import products from './modules/products.module';
import profile from './modules/profile.module';

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
