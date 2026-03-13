import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      fetch: path.resolve(__dirname, './src/fetch'),
      assets: path.resolve(__dirname, './src/assets'),
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @import "styles/variables.scss";
          @import "styles/mixins.scss";
        `,
      },
    },
  },
});
