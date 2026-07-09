import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/modules/shared/assets/styles/_variables.scss";
          @import "./src/modules/shared/assets/styles/_mixins.scss";
        `,
      },
    },
  },
});
