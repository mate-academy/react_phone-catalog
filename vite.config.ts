import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

const alias = {
  '@app': path.resolve(__dirname, 'src/app'),
  '@shared':path.resolve(__dirname, 'src/shared'),
  '@constants': path.resolve(__dirname, 'src/shared/constants'),
  '@ui': path.resolve(__dirname, 'src/shared/ui'),
  '@mixins': path.resolve(__dirname, 'src/shared/styles/mixins'),
  '@shtypes': path.resolve(__dirname, 'src/shared/types'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias },
})
