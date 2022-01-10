import Index from './components/Index.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import Error500 from "./components/Error500.vue";
import Error404 from "./components/Error404.vue";
import SrpNew from "./components/SrpNew.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Index },
    { path: '/srp/new', component: SrpNew },
    { path: '/error', component: Error500 },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error404 },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;