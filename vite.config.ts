import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'your-repo-name' with your actual GitHub repository name
  // For example, if your repo URL is https://github.com/username/react_phone-catalog
  // then base should be '/react_phone-catalog/'
  base: '/react_phone-catalog/',
});
