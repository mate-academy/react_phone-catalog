import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react_phone-catalog/',
  plugins: [react()],
  server: {
    host: true, // дозволяє підключення з будь-якої IP-адреси мережі
  },
})
