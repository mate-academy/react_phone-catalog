export const APP_BASE_PATH =
  import.meta.env.VITE_APP_BASE_PATH ||
  (import.meta.env.PROD ? '/react_phone-catalog/' : '/');

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/public/api/';
