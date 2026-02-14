import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/react_phone-catalog-0/' : '/',
  
  // Оптимізація продуктивності
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          swiper: ['swiper'],
        },
      },
    },
  },
  
  // Оптимізація dev сервера
  server: {
    hmr: {
      overlay: false,
    },
  },
})
