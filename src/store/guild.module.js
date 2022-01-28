import GuildService from '../services/guild.service';

const initialState = {
    guilds: [],
    connectable: []
};

export const guild = {
    namespaced: true,
    state: initialState,
    actions: {
        getGuilds({commit}) {
            GuildService.getGuilds().then(
                guilds => {
                    commit('setGuilds', guilds)
                }
            )
        },
        clearGuilds({commit}) {
            commit('setGuilds', [])
        },
        getConnectable({commit}) {
            GuildService.getConnectable().then(
                guilds => {
                    commit('setConnectable', guilds)
                }
            )
        },
        clearConnectable({commit}) {
            commit('setConnectable', [])
        },
    },
    mutations: {
        setGuilds(state, guilds) {
            state.guilds = guilds;
        },
        setConnectable(state, guilds) {
            state.connectable = guilds;
        }
    },
    getters: {
        guilds(state) {
            return state.guilds;
        },
        connectable(state) {
            return state.connectable;
        },
    }
};