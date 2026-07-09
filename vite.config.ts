import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react_phone-catalog/',
  define: {
    __BASE_URL__: JSON.stringify('/react_phone-catalog/'),
  },
});
