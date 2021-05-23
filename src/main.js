import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';
import Vuex from 'vuex';
import createStore from './vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = createStore();

window.vuestore = store;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  store: store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
});


// theme

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  store.commit('updateTheme', e.matches ? "dark" : "light")
});