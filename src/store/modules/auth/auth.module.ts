import { Module } from 'vuex';
import axios from 'axios';

const baseURL: string = process.env.VUE_APP_BIDSIDE_BACKEND_URL || '';

import { AuthState } from './auth.types';

const auth: Module<AuthState, {}> = {
  state: {
    jwt: null
  },

  mutations: {
    setJwt(state, { jwt }: { jwt: string | null }) {
      state.jwt = jwt;
      console.log(state);
    }
  },

  getters: {
    getJwt(state) {
      return state.jwt;
    }
  },

  actions: {
    logout({ commit }) {
      commit('setJwt', {
        jwt: null
      });
    },

    async login(
      { commit },
      { email, password }: { email: string; password: string }
    ) {
      const response = await axios.post(
        `${baseURL}/auth/login`,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data || !response.data.token) {
        throw new Error('Login failed, please try again!');
      }

      commit('setJwt', {
        jwt: response.data.token
      });
    },

    async register(
      { dispatch },
      {
        email,
        password,
        passwordAgain,
        firstName,
        lastName
      }: {
        email: string;
        password: string;
        passwordAgain: string;
        firstName?: string;
        lastName?: string;
      }
    ) {
      const response = await axios.post(
        `${baseURL}/auth/signup`,
        {
          email,
          password,
          passwordAgain,
          firstName,
          lastName
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data) {
        throw new Error('Registration failed, please try again!');
      }

      dispatch('login', {
        email,
        password
      });
    }
  }
};

export default auth;