import axios from 'axios';
import Cookies from "js-cookie";
import authHeader from "./auth.header";

const API_URL = import.meta.env.VITE_APP_API_URL;

class AuthService {
    login() {
        return axios
            .get(API_URL + '/api/user', {
                headers: authHeader()
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        Cookies.remove('token');
    }
}

export default new AuthService();