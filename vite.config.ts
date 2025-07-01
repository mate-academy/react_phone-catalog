import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        includePaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      styles: path.resolve(__dirname, 'src/styles'),
      data: path.resolve(__dirname, 'src/data'),
    },
  },
});
