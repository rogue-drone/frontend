import axios from 'axios';
import authHeader from "./auth.header";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_API_URL;

class GuildService {
    getGuilds() {
        return axios
            .get(API_URL + '/api/guild', {
                headers: authHeader()
            })
            .catch(error => {
                Sentry.captureException(error);
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new GuildService();