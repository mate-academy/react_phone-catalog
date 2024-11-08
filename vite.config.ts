import { resolve } from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/mixins.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@locales': resolve(__dirname, 'src/locales'),
      '@context': resolve(__dirname, 'src/context'),
      '@store': resolve(__dirname, 'src/store'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@ui': resolve(__dirname, 'src/ui'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  base: '/react_phone-catalog/',
});
