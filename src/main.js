import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router
});