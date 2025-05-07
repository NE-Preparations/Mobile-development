export enum UserRole {
    STUDENT = 'STUDENT',
    LIBRARIAN = 'LIBRARIAN',
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
  }

  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }
  
  export interface PasswordChange {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  export interface ProfileUpdate {
    name: string;
    email: string;
  }
  
  export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    ISBN: string;
    publicationYear: number;
    available: boolean;
    description: string;
    coverImage?: string;
    borrowedBy?: string;
    borrowDate?: string;
    returnDate?: string;
  }

  export interface BookFormData {
    title: string;
    author: string;
    category: string;
    ISBN: string;
    publicationYear: number;
    description: string;
    coverImage?: string;
  }

  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }