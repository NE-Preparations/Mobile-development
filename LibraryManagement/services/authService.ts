import api from './api';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  PasswordChange,
  ProfileUpdate,
  ApiResponse,
  User
} from '../types/index';

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post<ApiResponse<{ token: string }>>('/users/login', credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials) => {
  const response = await api.post<ApiResponse<{ token: string }>>('/users/register', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<ApiResponse<User>>('/users/me');
  return response.data;
};

export const updateProfile = async (profileData: ProfileUpdate) => {
  const response = await api.put<ApiResponse<User>>('/users/update-profile', profileData);
  return response.data;
};

export const changePassword = async (passwordData: PasswordChange) => {
  const response = await api.put<ApiResponse<null>>('/users/change-password', {
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  });
  return response.data;
};