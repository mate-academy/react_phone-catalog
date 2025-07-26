import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const mode = process.env.NODE_ENV;
// : 'development' | "production"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: mode === 'production' ? '/react_phone-catalog/' : undefined,
});
