import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { resolve } from 'path';

export default defineConfig({
  base: '/react_phone-catalog/', // Set base path for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@modules': resolve(__dirname, 'src/modules'),
      '@public': resolve(__dirname, 'public'),
      '@mocks': resolve(__dirname, 'src/mocks'),
    },
  },
})
