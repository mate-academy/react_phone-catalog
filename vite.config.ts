import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // base: command === 'serve' ? './' : '/react_phone-catalog/',
  base: '/react_phone-catalog/',
  plugins: [react()],
}))
