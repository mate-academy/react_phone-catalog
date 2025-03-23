import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
  },
});
