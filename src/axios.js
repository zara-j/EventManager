import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const api = axios.create({
  baseURL: 'https://event.shirpala.ir/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Token might be expired or invalid
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const token = localStorage.getItem('token');
        if (token) {
          const isValid = await verifyToken(token);
          if (!isValid) {
            localStorage.removeItem('token');
            router.push('/login'); // Redirect to login page
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

async function verifyToken(token) {
  try {
    const response = await axios.post('https://event.shirpala.ir/api/token/verify/', { token });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export default api;
