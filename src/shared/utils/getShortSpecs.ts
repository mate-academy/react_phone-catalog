import { Product } from 'src/types/Product';

export const getShortSpecs = (product: Product) => [
  {
    translationKey: 'specs.screen',
    value: product.screen,
  },

  {
    translationKey: 'specs.capacity',
    value: product.capacity,
  },

  {
    translationKey: 'specs.ram',
    value: product.ram,
  },
];
