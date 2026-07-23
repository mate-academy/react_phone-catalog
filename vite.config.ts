import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@public': path.resolve(__dirname, 'public'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
});
