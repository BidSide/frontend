import { Module } from 'vuex';
import axios from '@/lib/axios';

import { Profile } from '@/types';

// config
import { baseURL } from '@/config';

import { AuthState } from './auth.types';

const auth: Module<AuthState, {}> = {
  state: {
    jwt: localStorage.getItem('jwt'),
    profile: null
  },

  mutations: {
    setJwt(state, { jwt }: { jwt: string | null }) {
      state.jwt = jwt;

      if (jwt) {
        localStorage.setItem('jwt', jwt);
      } else {
        localStorage.removeItem('jwt');
      }
    },

    setProfile(state, { profile }: { profile: Profile }) {
      state.profile = profile;
    }
  },

  getters: {
    getJwt(state) {
      return state.jwt;
    },

    getProfile(state) {
      return state.profile;
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
    },

    async fetchProfile({ commit }) {
      const response = await axios.get(`${baseURL}/profile`);

      if (response.data) {
        commit('setProfile', {
          profile: response.data
        });
      }
    }
  }
};

export default auth;
