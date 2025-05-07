import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { 
  User, 
  AuthState, 
  LoginCredentials, 
  RegisterCredentials, 
  PasswordChange,
  ProfileUpdate
} from '../types/index';
import api from '../services/api';
import { Toast } from 'react-native-toast-message';


interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (passwordData: PasswordChange) => Promise<void>;
  updateProfile: (profileData: ProfileUpdate) => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  changePassword: async () => {},
  updateProfile: async () => {},
  checkAuthStatus: async () => false,
});



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const loadUser = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setAuthState(current => ({ ...current, loading: false }));
      }
    };

    loadUser();
  }, []);

  // Function to check authentication status
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
        return false;
      }

      // Fetch the current user
      const response = await api.get('/users/me');
      
      if (response.data && response.data.data) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.data,
          loading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('Failed to get user data');
      }
    } catch (error) {
      console.error('Auth status check error:', error);
      await SecureStore.deleteItemAsync('authToken');
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: 'Authentication failed',
      });
      return false;
    }
  };

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(current => ({ ...current, loading: true, error: null }));
      
      const response = await api.post('/users/login', credentials);
      
      if (response.data && response.data.token) {
        await SecureStore.setItemAsync('authToken', response.data.token);
        
        // Get user data
        const userResponse = await api.get('/users/me');
        
        setAuthState({
          isAuthenticated: true,
          user: userResponse.data.data,
          loading: false,
          error: null,
        });
        
        // Redirect to dashboard
        router.replace('/dashboard');
        
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${userResponse.data.data.name}!`,
        });
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      
      setAuthState(current => ({
        ...current,
        loading: false,
        error: error.response?.data?.message || 'Login failed. Please try again.',
      }));
      
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Please check your credentials and try again.',
      });
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    try {
      setAuthState(current => ({ ...current, loading: true, error: null }));
      
      const response = await api.post('/users/register', credentials);
      
      if (response.data && response.data.token) {
        await SecureStore.setItemAsync('authToken', response.data.token);
        
        // Get user data
        const userResponse = await api.get('/users/me');
        
        setAuthState({
          isAuthenticated: true,
          user: userResponse.data.data,
          loading: false,
          error: null,
        });
        
        // Redirect to dashboard
        router.replace('/dashboard');
        
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: `Welcome, ${userResponse.data.data.name}!`,
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      
      setAuthState(current => ({
        ...current,
        loading: false,
        error: error.response?.data?.message || 'Registration failed. Please try again.',
      }));
      
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.response?.data?.message || 'Please check your information and try again.',
      });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
      
      // Redirect to landing page
      router.replace('/');
      
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'An error occurred during logout.',
      });
    }
  };

  // Change password function
  const changePassword = async (passwordData: PasswordChange) => {
    try {
      setAuthState(current => ({ ...current, loading: true, error: null }));
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      const response = await api.put('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setAuthState(current => ({ ...current, loading: false }));
      
      Toast.show({
        type: 'success',
        text1: 'Password Changed',
        text2: 'Your password has been updated successfully.',
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Change password error:', error.response?.data || error.message);
      
      setAuthState(current => ({
        ...current,
        loading: false,
        error: error.response?.data?.message || 'Password change failed.',
      }));
      
      Toast.show({
        type: 'error',
        text1: 'Password Change Failed',
        text2: error.response?.data?.message || 'Please check your current password and try again.',
      });
      
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (profileData: ProfileUpdate) => {
    try {
      setAuthState(current => ({ ...current, loading: true, error: null }));
      
      const response = await api.put('/users/update-profile', profileData);
      
      if (response.data && response.data.data) {
        setAuthState(current => ({
          ...current,
          loading: false,
          user: response.data.data,
        }));
        
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: 'Your profile has been updated successfully.',
        });
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data || error.message);
      
      setAuthState(current => ({
        ...current,
        loading: false,
        error: error.response?.data?.message || 'Profile update failed.',
      }));
      
      Toast.show({
        type: 'error',
        text1: 'Profile Update Failed',
        text2: error.response?.data?.message || 'Please try again.',
      });
      
      throw error;
    }
  };

  const contextValue = {
    ...authState,
    login,
    register,
    logout,
    changePassword,
    updateProfile,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);