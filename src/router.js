import VueRouter from 'vue-router';
import app from './views/App.vue';

const notFound = { template: '<div>not found</div>' }

const routes = [
    { path: '/', name: 'app', component: app },
    { path: '/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])', name: 'day', component: app, props: true },
    { path: '*', name: 'not_found', component: notFound }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes
})

export default router;