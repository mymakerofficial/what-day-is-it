import VueRouter from 'vue-router';
import app from './views/App.vue';
import notFound from './views/NotFound.vue';
import forecast from './views/Forecast.vue';
import custom from './views/Custom.vue';
import details from './views/DayDetails.vue';
import about from './views/About.vue';

const routes = [
    { path: '/', name: 'app', component: app },
    { path: '/about', name: 'about', component: about },
    { path: '/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])', name: 'day', component: app, props: true },
    { path: '/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])/details', name: 'day_details', component: details, props: true },
    { path: '/(custom|c)/:title/:text?', name: 'custom_day_simple', component: custom },
    { path: '/(custom|c)/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])/:title/:text?', name: 'custom_day_full', component: custom },
    { path: '/(custom|c)', name: 'custom_day', component: custom },
    { path: '/forecast', name: 'forecast', component: forecast },
    { path: '*', name: 'not_found', component: notFound }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes
})

export default router;