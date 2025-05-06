import axios from 'axios';
import Constants from 'expo-constants';
import { Book } from '../types/book';
import { getToken } from '../utils/auth';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5051'

export const getBooks = async () => {
    const token = await getToken();
    const response = await axios.get<Book[]>(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getBook = async (id: string) => {
    const token = await getToken();
    const response = await axios.get<Book>(`${API_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}


export const createBook = async (book: Omit<Book, 'id'>) => {
    const token = await getToken();
    const response = await axios.post<Book>(`${API_URL}/books`, book, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateBook = async (id: string, book: Partial<Book>) => {
    const token = await getToken();
    const response = await axios.put<Book>(`${API_URL}/books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteBook = async (id: string) => {
    const token = await getToken();
    await axios.delete(`${API_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const borrowBook = async (bookId: string) => {
    const token = await getToken();
    const response = await axios.post(`${API_URL}/borrow`, { bookId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export const returnBook = async (bookId: string) => {
    const token = await getToken()
    const response = await axios.post(`${API_URL}/return`, { bookId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getBorrowingHistory = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/borrow/history`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};