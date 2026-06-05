import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/env';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
