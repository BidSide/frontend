import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// store
import store from '@/store';

// Components
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter(_, __, next) {
        if (!store.getters.getJwt) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '*',
      name: 'Page not found!',
      component: NotFound
    }
  ]
});

export default router;
