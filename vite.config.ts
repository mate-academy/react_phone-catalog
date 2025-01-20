import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_phone-catalog/', // Set the repository name as the base path
  resolve: {
    alias: {
      'react-redux': require.resolve('react-redux'), // Explicitly resolve react-redux if needed
    },
  },
})
