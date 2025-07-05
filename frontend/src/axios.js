/* import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL de ton backend Laravel
  withCredentials: true,            // Important pour Sanctum
});

export default api; */






import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Injecte dynamiquement le token à chaque requête
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
