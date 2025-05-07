import { Platform } from 'react-native';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://172.27.128.1:5051/api';

export default {
    API_BASE_URL
};