import ApiClient from "./api.client";

const API_URL = import.meta.env.VITE_APP_API_URL;

class GuildService {
    getGuilds() {
        return ApiClient.get(API_URL + '/api/guild');
    }

    getConnectable() {
        return ApiClient.get(API_URL + '/api/guild/connectable');
    }
}

export default new GuildService();