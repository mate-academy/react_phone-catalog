import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Автоматично імпортує файл у кожен SCSS модуль
        additionalData: `@use "./src/styles/breakpoints" as *;\n`,
      },
    },
  },
});
