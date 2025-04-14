import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.example.com/', // твій базовий API-ендпоінт
  timeout: 5000, // опційно: максимальний час очікування
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}` — якщо потрібен токен
  },
});
