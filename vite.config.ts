import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ include: '**/*.svg?react' }), react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
