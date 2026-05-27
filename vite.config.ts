import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      '@public': path.resolve(__dirname, './public'),

      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
});
