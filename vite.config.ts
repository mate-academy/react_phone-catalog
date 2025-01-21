import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sTypes': path.resolve(__dirname, 'src/modules/shared/types'),
      '@store': path.resolve(__dirname, 'src/modules/shared/store'),
      '@utils': path.resolve(__dirname, 'src/modules/shared/utils'),
      '@styles': path.resolve(__dirname, 'src/modules/shared/styles'),
      '@services': path.resolve(__dirname, 'src/modules/shared/services'),
      '@components': path.resolve(__dirname, 'src/modules/shared/components'),
    },
  },
});
