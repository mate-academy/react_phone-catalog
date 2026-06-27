import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Шлях має точно вказувати на твій файл з міксинами
        additionalData: `@import "./src/styles/utils/_mixins.scss";`
      }
    }
  }
})
