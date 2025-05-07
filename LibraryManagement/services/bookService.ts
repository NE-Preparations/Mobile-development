import api from './api';
import { Book, BookFormData, ApiResponse } from '../types';

// Get all books
export const getAllBooks = async (page = 1, limit = 10) => {
  const response = await api.get<ApiResponse<Book[]>>(`/books?page=${page}&limit=${limit}`);
  return response.data;
};

// Get book by ID
export const getBookById = async (id: string) => {
  const response = await api.get<ApiResponse<Book>>(`/books/${id}`);
  return response.data;
};

// Search books
export const searchBooks = async (query: string) => {
  const response = await api.get<ApiResponse<Book[]>>(`/books/search?q=${query}`);
  return response.data;
};

// Filter books by category
export const filterBooksByCategory = async (category: string) => {
  const response = await api.get<ApiResponse<Book[]>>(`/books/category/${category}`);
  return response.data;
};

// Borrow a book (Student only)
export const borrowBook = async (bookId: string) => {
  const response = await api.put<ApiResponse<Book>>(`/books/${bookId}/borrow`);
  return response.data;
};

// Return a book (Student only)
export const returnBook = async (bookId: string) => {
  const response = await api.put<ApiResponse<Book>>(`/books/${bookId}/return`);
  return response.data;
};

// Get borrowed books (Student only)
export const getBorrowedBooks = async () => {
  const response = await api.get<ApiResponse<Book[]>>('/books/user/borrowed');
  return response.data;
};

// Create a new book (Librarian only)
export const createBook = async (bookData: BookFormData) => {
  const response = await api.post<ApiResponse<Book>>('/books', bookData);
  return response.data;
};

// Update a book (Librarian only)
export const updateBook = async (id: string, bookData: BookFormData) => {
  const response = await api.put<ApiResponse<Book>>(`/books/${id}`, bookData);
  return response.data;
};

// Delete a book (Librarian only)
export const deleteBook = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/books/${id}`);
  return response.data;
};