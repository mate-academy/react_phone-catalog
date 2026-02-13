import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Header': path.resolve(__dirname, 'src/components/Header'),
      '@GlobalComponents': path.resolve(__dirname, 'src/components'),
      '@HomePage': path.resolve(__dirname, 'src/modules/HomePage'),
      '@Images': path.resolve(__dirname, 'src/assets/images'),
      '@GlobalStyle': path.resolve(__dirname, 'src/assets/styles'),
      '@Fetch': path.resolve(__dirname, 'src/services/'),
    },
  },
  css: {
    modules: {
      generateScopedName: (name, fileName) => {
        const file = path.basename(fileName, '.module.scss');
        const shortHash = Buffer.from(file + name)
          .toString('base64')
          .slice(0, 5);

        return `${file}__${name}___${shortHash}`;
      },
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@GlobalStyle/global' as *;`,
      },
    },
  },
});
