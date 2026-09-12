import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react_phone-catalog/',
  test: {
    exclude: ['cypress/**', 'node_modules/**', 'dist/**'],
  },
});
