const initialState = {
    loaded: false,
    guild: null
};

export const app = {
    namespaced: true,
    state: initialState,
    actions: {
        setLoaded({commit}) {
            commit('setLoaded', true);
        },
        setActiveGuild({commit}, guild) {
            commit('setActiveGuild', guild);
        }
    },
    mutations: {
        setLoaded(state, loaded) {
            state.loaded = loaded;
        },
        setActiveGuild(state, guild) {
            state.guild = guild;
        }
    },
    getters: {
        isLoaded(state) {
            return state.loaded;
        },
        activeGuild(state) {
            return state.guild;
        }
    }
};