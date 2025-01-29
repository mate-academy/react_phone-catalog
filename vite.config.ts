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
      '@hooks': path.resolve(__dirname, 'src/modules/shared/hooks'),
      '@utils': path.resolve(__dirname, 'src/modules/shared/utils'),
      '@styles': path.resolve(__dirname, 'src/modules/shared/styles/utils'),
      '@features': path.resolve(__dirname, 'src/modules/shared/features'),
      '@services': path.resolve(__dirname, 'src/modules/shared/services'),
      '@components': path.resolve(__dirname, 'src/modules/shared/components'),

      '@App': path.resolve(__dirname, 'src/modules/App'),
      '@HomePage': path.resolve(__dirname, 'src/modules/HomePage'),
    },
  },
});
