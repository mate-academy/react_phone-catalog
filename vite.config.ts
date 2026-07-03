import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/styles'],
        additionalData: (content: string, filepath: string) => {
          const p = filepath.replace(/\\/g, '/');

          if (
            p.includes('helpers') ||
            p.includes('utils') ||
            p.includes('normalize')) {
            return content;
          }
          return `@import "helpers";\n` + content;
        }
      }
    }
  }
});
