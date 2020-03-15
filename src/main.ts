import Vue from 'vue';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

// Components
import App from '@/App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
