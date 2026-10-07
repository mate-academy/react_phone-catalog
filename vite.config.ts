import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/react_phone-catalog/',
})  