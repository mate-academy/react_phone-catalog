import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Якщо ти назвав репозиторій на гітхабі інакше — зміни назву між слешами
    base: command === 'build' ? '/react_phone-catalog/' : '/',
  };
});
