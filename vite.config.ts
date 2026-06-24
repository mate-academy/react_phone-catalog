import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_phone-catalog/',
  server: {
    host: true, // або '0.0.0.0' для доступу з локальної мережі
    port: 5173,
  },
});
