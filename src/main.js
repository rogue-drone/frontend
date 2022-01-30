import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const sentryDsn = import.meta.env.VITE_APP_SENTRY_DSN

const app = createApp(App)

Sentry.init({
    app,
    dsn: sentryDsn,
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
