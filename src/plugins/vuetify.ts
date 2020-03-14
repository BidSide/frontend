import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#700961',
        secondary: '#ffde46',
        error: '#e03e36',
        warning: '#ff7c38',
        info: '#1eb2a6'
      }
    }
  }
});
