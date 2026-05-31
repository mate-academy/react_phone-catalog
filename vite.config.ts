import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  root: 'src',
  base: command === 'build' ? '/react_phone-catalog/' : '/',
  publicDir: 'public',
  build: {
    outDir: '../dist',
  },
}))
