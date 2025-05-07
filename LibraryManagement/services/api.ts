import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('token');
        if(token) {
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
    (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            await SecureStore.deleteItemAsync('token');
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
);

export default api;