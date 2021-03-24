import VueRouter from 'vue-router';
import app from './views/App.vue';

const notFound = { template: '<div>not found</div>' }

const routes = [
    { path: '/', name: 'app', component: app },
    { path: '*', name: 'not_found', component: notFound }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes
})

export default router;