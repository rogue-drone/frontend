import GuildService from '../services/guild.service';

const initialState = {
    guilds: []
};

export const guild = {
    namespaced: true,
    state: initialState,
    actions: {
        getGuilds({commit}, state) {
            GuildService.getGuilds().then(
                guilds => {
                    commit('setGuilds', guilds)
                }
            )
        },
        clearGuilds({commit}) {
            commit('setGuilds', [])
        }
    },
    mutations: {
        setGuilds(state, guilds) {
            state.guilds = guilds;
        }
    },
    getters: {
        guilds(state) {
            return state.guilds;
        },
    }
};