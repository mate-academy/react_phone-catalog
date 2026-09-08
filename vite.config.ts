import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const file = path.basename(filename, '.module.scss');
        const shortHash = Buffer.from(file + name)
          .toString('base64')
          .slice(0, 5);

        return `${file}__${name}___${shortHash}`;
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
