import axios from 'axios';

if (!import.meta.env.VITE_API_URL) {
  throw new Error(
    'FATAL ERROR: VITE_API_URL is not defined. The application cannot be built.',
  );
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
