import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Modules
import auth from './modules/auth';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth
  }
});
