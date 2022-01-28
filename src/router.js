import {createRouter, createWebHistory} from "vue-router";
import Error500 from "./views/Error500.vue";
import Error404 from "./views/Error404.vue";
import SrpNew from "./views/SrpNew.vue";
import Index from './views/Index.vue'
import Guild from "./views/Guild.vue";
import Connect from "./views/Connect.vue";

const authUrl = import.meta.env.VITE_APP_API_URL + '/auth/connect'
const botConnect = import.meta.env.VITE_APP_API_URL + '/bot/connect'

const routes = [
    { path: '/', component: Index },
    { path: '/guild', component: Guild },
    { path: '/srp/new', component: SrpNew },
    { path: '/error', component: Error500 },
    {
        path: '/connect',
        component: Index,
        beforeEnter(to, from, next) {
            window.location.href = authUrl
        }
    },
    {
        path: '/guilds/connect',
        component: Connect
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error404 },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;