import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Якщо робимо білд для GitHub Pages — додаємо назву репозиторію.
    // Якщо запускаємо локально (dev) — залишаємо просто '/'
    base: command === 'build' ? '/react_phone-catalogg/' : '/',
  }
})
