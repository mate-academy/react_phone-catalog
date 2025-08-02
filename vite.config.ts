import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/product_catalog/',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/modules/shared'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
});
