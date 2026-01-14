import axios from 'axios';
import { Config } from '../constants/Config';
import { authService } from './auth';

const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized (Token refresh logic could go here)
        if (error.response?.status === 401) {
            await authService.logout();
        }
        return Promise.reject(error);
    }
);

export default api;
