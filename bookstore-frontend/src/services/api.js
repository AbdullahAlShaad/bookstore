import axios from 'axios';

const API_URL = (() => {
    if (typeof window !== 'undefined' && window.REACT_APP_API_URL) {
      return window.REACT_APP_API_URL;
    }
    return '/api';
  })();
  


// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Book services - no authentication required
export const getAllBooks = async () => {
  return await api.get('/books');
};

export const getBookByISBN = async (isbn) => {
  return await api.get(`/books/isbn/${isbn}`);
};

export const getBookByName = async (name) => {
  return await api.get(`/books/name/${name}`);
};

export const getBooksNameSimplified = async () => {
  return await api.get('/books/simple');
};

export default api;