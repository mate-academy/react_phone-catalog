import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/modules/shared'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '',
      },
    },
  },
});
