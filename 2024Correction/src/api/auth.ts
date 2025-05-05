import axios from 'axios';
import Constants from 'expo-constants';
import { User, storeToken, storeUser } from '../utils/auth';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5051';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = response.data;
    await storeToken(token);
    await storeUser(user);
    return user as User;
};

export const register = async (email: string, password: string, role: 'STUDENT' | 'LIBRARIAN') => {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password, role });
    const { token, user } = response.data;
    await storeToken(token);
    await storeUser(user);
    return user as User;
};

export const getCurrentUser = async (token: string) => {
    const response = await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data.user as User;
};