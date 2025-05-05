import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    email: string;
    role: 'STUDENT' | 'LIBRARIAN';
}

export const storeToken = async (token: string) => {
    await AsyncStorage.setItem('jwt', token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem('jwt');
};

export const removeToken = async () => {
    await AsyncStorage.removeItem('jwt');
};

export const storeUser = async (user: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export const getUser = async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearAuth = async () => {
    await AsyncStorage.multiRemove(['jwt', 'user']);
};