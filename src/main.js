import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App)

Sentry.init({
    app,
    dsn: "https://27098942e0124d8cafe2f06a11d051d0@o1115805.ingest.sentry.io/6148231",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
});

app.use(router)
app.use(store)

app.mount('#app')
