import { Module } from 'vuex';
import axios from '@/lib/axios';

// config
import { baseURL } from '@/config';

const auth: Module<
  {
    jwt: string | null;
  },
  {}
> = {
  state: {
    jwt: localStorage.getItem('jwt')
  },

  getters: {
    getJwt(state) {
      return state.jwt;
    }
  },

  mutations: {
    setJwt(state, { jwt }: { jwt: string | null }) {
      state.jwt = jwt;

      if (jwt) {
        localStorage.setItem('jwt', jwt);
      } else {
        localStorage.removeItem('jwt');
      }
    }
  },

  actions: {
    logout({ commit }) {
      commit('setJwt', {
        jwt: null
      });
      commit('setProfile', {
        profile: null
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
