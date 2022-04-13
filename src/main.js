import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';
import Vuex from 'vuex';
import createStore from './vuex';
import App from './App';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = createStore();

window.vuestore = store;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
    this.$store.commit('updateShareUrl', `https://day.maiker.de${router.currentRoute.path}`)
  },
}).$mount('#app');

router.afterEach((to) => {
  console.log(to)
  store.commit('updateShareUrl', `https://day.maiker.de${to.path}`)
  return true
})


// theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  store.commit('updateTheme', e.matches ? "dark" : "light")
});