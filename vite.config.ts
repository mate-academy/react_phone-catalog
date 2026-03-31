import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/mixins/fonts.scss" as *;
        @use "@/styles/mixins/respond.scss" as *;
        @use "@/styles/mixins/shadows.scss" as *;
        @use "@/styles/tockens/colors.scss" as *;
        @use "@/styles/tockens/other.scss" as *;
        @use "@/styles/animation/animation.scss" as *;
        @use "@/styles/keyframes/keyframes.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
