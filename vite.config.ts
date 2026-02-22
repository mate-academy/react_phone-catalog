import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    base: isDev ? '/' : '/react_phone-catalog/',
    plugins: [react()],
  };
});
