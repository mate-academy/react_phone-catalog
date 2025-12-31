import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr(),],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/mixins/fonts.scss" as *;
        @use "@/styles/mixins/respond.scss" as *;
        @use "@/styles/tockens/colors.scss" as *;
        @use "@/styles/mixins/animation.scss" as *;
        `

      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
