import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  base: '/react_phone-catalog/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/utils/variables.scss";
          @import "src/styles/utils/mixins.scss";
        `,
      },
    },
  },
});
