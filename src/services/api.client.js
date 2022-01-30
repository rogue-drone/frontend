import axios from 'axios';
import authHeader from "./auth.header";
import * as Sentry from "@sentry/vue";

class ApiClient {
    async get(uri, params = []) {
        return await axios
            .get(uri, {
                ...params,
                headers: authHeader(),
            })
            .catch(error => {
                Sentry.captureException(error);
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new ApiClient();