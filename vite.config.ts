import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

const alias = {
  '@app': path.resolve(__dirname, 'src/app'),
  '@shared':path.resolve(__dirname, 'src/shared'),
  '@ui': path.resolve(__dirname, 'src/shared/ui'),
  '@entities': path.resolve(__dirname, 'src/entities'),
  '@widgets': path.resolve(__dirname, 'src/widgets'),
  '@features': path.resolve(__dirname, 'src/features'),
  '@server': path.resolve(__dirname, 'src/serverMock'),
  '@pages': path.resolve(__dirname, 'src/pages'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias },
})
