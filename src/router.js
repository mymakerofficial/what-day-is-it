import VueRouter from 'vue-router';
import app from './views/App.vue';
import notFound from './views/NotFound.vue';
import forecast from './views/Forecast.vue';
import custom from './views/Custom.vue';
import details from './views/DayDetails.vue';
import about from './views/About.vue';
import dayEditor from './views/CustumDayEditor.vue';
import embed from './views/Embed.vue';
import markdown from './views/MarkdownGuide.vue';
import thing from './views/ThingOfTheDay.vue';
import things from './views/ThingsList.vue';

const routes = [
    { path: '/', name: 'app', component: app },
    { path: '/about', name: 'about', component: about },
    { path: '/markdown', name: 'markdown', component: markdown },
    { path: '/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])', name: 'day', component: app, props: true },
    { path: '/:year([0-9][0-9][0-9][0-9])/:month([0-9][0-9]|[0-9])/:day([0-9][0-9]|[0-9])/details', name: 'day_details', component: details, props: true },
    { path: '/(custom|c)/:data', name: 'custom_day', component: custom },
    { path: '/(custom|c)', name: 'custom_day_editor', component: dayEditor },
    { path: '/day/:thing', name: 'thingOfTheDay', component: thing },
    { path: '/forecast', name: 'forecast', component: forecast },
    { path: '/things', name: 'things', component: things },
    { path: '/embed', name: 'embed', component: embed },
    { path: '*', name: 'not_found', component: notFound }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes
})

export default router;