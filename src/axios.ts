import axios from 'axios';

console.log('VITE_API_URL from import.meta.env:', import.meta.env.VITE_API_URL);

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || 'https://node.cosmicpenguin.xyz/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
