import fs from 'node:fs';
import path from 'node:path';

import {
  defineConfig,
  type Plugin,
} from 'vite';

import react from '@vitejs/plugin-react';

const spaFallback = (): Plugin => ({
  name: 'spa-fallback',

  closeBundle() {
    const distPath = path.resolve(
      __dirname,
      'dist',
    );

    const indexPath = path.join(
      distPath,
      'index.html',
    );

    const fallbackPath = path.join(
      distPath,
      '404.html',
    );

    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(
        indexPath,
        fallbackPath,
      );
    }
  },
});

export default defineConfig(
  ({ mode }) => ({
    plugins: [
      react(),
      spaFallback(),
    ],

    base:
      mode === 'production'
        ? '/react_phone-catalog/'
        : '/',
  }),
);
