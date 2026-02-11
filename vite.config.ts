import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/react_phone-catalog/' : '/',
  plugins: [react()],
}));

// export default defineConfig({
//   base: '/react_phone-catalog/',
//   plugins: [react()],
// });
