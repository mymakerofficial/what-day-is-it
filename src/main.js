import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router
});


// theme

if(!localStorage.theme){
  localStorage.theme = 'light'
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) localStorage.theme = 'dark'
  console.log("theme was not set")
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  document.changeTheme(e.matches ? "dark" : "light")
});

document.changeTheme = function (theme) {
  if(theme) localStorage.theme = theme
  document.documentElement.className = localStorage.theme
}

document.changeTheme();