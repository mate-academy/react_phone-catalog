import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
});
