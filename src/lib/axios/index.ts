import axios from 'axios';

import router from '@/router';
import store from '@/store';

const client = axios.create();

// add authorization to every request
client.interceptors.request.use(
  request => {
    if (store.getters.getJwt) {
      request.headers = {
        Authorization: `Bearer ${store.getters.getJwt}`
      };
    }

    return request;
  },
  error => Promise.reject(error)
);

// handle 401
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('logout');
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default client;
