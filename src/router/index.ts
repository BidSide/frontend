import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

// store
import store from '@/store';

// Components
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Search from '@/views/Search.vue';
import ProductPage from '@/views/ProductPage.vue';
import PublicProfile from '@/views/PublicProfile.vue';
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
      component: Home
    },
    {
      path: '/products',
      component: Products
    },
    {
      path: '/products/category/:categoryName',
      component: Products
    },
    {
      path: '/search/:searchTerm',
      component: Search
    },
    {
      path: '/search/:categoryName/:searchTerm',
      component: Search
    },
    {
      path: '/product/:id',
      component: ProductPage
    },
    {
      path: '/profile/:id',
      component: PublicProfile
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
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
      component: NotFound
    }
  ]
});

export default router;
