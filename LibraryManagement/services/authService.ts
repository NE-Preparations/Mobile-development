import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole } from "../context/AuthContext";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};


export const updateProfile = async (token: string, userData: {name: string, email: string}) => {
    try {
        const response = await api.put('/auth/update-profile', userData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
};


export const changePassword = async (token: string, currentPassword: string, newPassword: string) => {
    try {
        await api.put('/auth/change-password',
            { currentPassword, newPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to change password');
    }
};