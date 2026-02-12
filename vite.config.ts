import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/modules/pages'),
      '@components': path.resolve(__dirname, 'src/modules/components'),
      '@context': path.resolve(__dirname, 'src/Context'),
      '@img': path.resolve(__dirname, 'src/img'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@models': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
})
