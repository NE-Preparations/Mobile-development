import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as authService from "../services/authService";

export enum UserRole {
  STUDENT = "STUDENT",
  LIBRARIAN = "LIBRARIAN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: { name: string; email: string }) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          const userData = await authService.getCurrentUser(storedToken);
          setUser(userData);
          setToken(storedToken);
        }
      } catch (err) {
        console.log("Failed to load user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token: newToken, user: userData } = await authService.login(
        email,
        password
      );

      await AsyncStorage.setItem("token", newToken);

      setToken(newToken);
      setUser(userData);

      router.replace("/(auth)/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };


const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);

    try {
        const { token: newToken, user: userData } = await authService.register(name, email, password, role);

        await AsyncStorage.setItem('token', newToken);

        setToken(newToken);
        setUser(userData);

        router.replace('/(auth)/dashboard');
    } catch (err: any) {
        setError(err.message || 'Registration failed. Please try again.');
    } finally {
        setIsLoading(false);
    }
};


const logout = async () => {
    try {
        await AsyncStorage.removeItem('token');

        setToken(null);
        setUser(null);

        router.replace('/');
    } catch(err) {
        console.error('Logout error:', err);
    }
};



const updateProfile = async (userData: {name: string, email: string}) => {
    setIsLoading(true);
    setError(null);

    try {
        if(!token) {
            throw new Error('Not authenticated');
        }

        const updatedUser = await authService.updateProfile(token, userData);
        setUser(updatedUser);
    } catch(err: any) {
        setError(err.message || 'Failed to update profile.');
    } finally {
        setIsLoading(false);
    }
};


const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      await authService.changePassword(token, currentPassword, newPassword);
    } catch (err: any) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error function
  const clearError = () => setError(null);

  // Context value
  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;

};