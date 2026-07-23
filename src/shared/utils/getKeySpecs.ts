import { ProductDetails } from 'src/types/ProductDetails';

export const getKeySpecs = (product: ProductDetails) => [
  {
    translationKey: 'Screen',
    value: product.screen,
  },

  {
    translationKey: 'Resolution',
    value: product.resolution,
  },

  {
    translationKey: 'Processor',
    value: product.processor,
  },

  {
    translationKey: 'RAM',
    value: product.ram,
  },
];
