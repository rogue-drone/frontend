import { createStore } from "vuex";
import { app } from "./app.module";
import { guild } from "./guild.module";
import { auth } from "./auth.module";

const store = createStore({
    modules: {
        auth,
        guild,
        app
    },
});

export default store;