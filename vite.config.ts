import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [
          {
            findFileUrl(url: string) {
              if (url.startsWith('styles/')) {
                return new URL(`./src/${url}.scss`, import.meta.url);
              }

              return null;
            },
          },
        ],
      },
    },
  },
});
