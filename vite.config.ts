import { basename } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const toKebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// "ProductCard.module.scss" + ".imageLink" -> "product-card__image-link"
// the root element of a block has no suffix:
// ".card" or ".productCard" -> "product-card"
const generateScopedName = (className: string, filename: string) => {
  const block = toKebabCase(basename(filename).split('.')[0]);
  const element = toKebabCase(className);
  const isBlockRoot = element === block || block.endsWith(`-${element}`);

  return isBlockRoot ? block : `${block}__${element}`;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: { generateScopedName },
  },
});
