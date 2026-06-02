import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
