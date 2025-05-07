import { UserRole } from '../types/index';

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateDaysRemaining = (returnDate: string | undefined): number => {
  if (!returnDate) return 0;
  
  const today = new Date();
  const due = new Date(returnDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const hasRole = (userRole: UserRole | undefined, role: UserRole): boolean => {
  return userRole === role;
};

export const isStudent = (userRole: UserRole | undefined): boolean => {
  return userRole === UserRole.STUDENT;
};

export const isLibrarian = (userRole: UserRole | undefined): boolean => {
  return userRole === UserRole.LIBRARIAN;
};

export const getAvailabilityStatus = (book: { available: boolean }): { status: string; color: string } => {
  if (book.available) {
    return { status: 'Available', color: 'text-green-600' };
  } else {
    return { status: 'Borrowed', color: 'text-red-500' };
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const bookCategories = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Biography',
  'Technology',
  'Arts',
  'Philosophy',
  'Mathematics',
  'Literature',
];

export const parseError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unknown error occurred';
};