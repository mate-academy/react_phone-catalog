import { ProductDetails } from 'src/types/ProductDetails';

export const getFullSpecs = (product: ProductDetails) => [
  {
    label: 'Screen',
    value: product.screen,
  },

  {
    label: 'Resolution',
    value: product.resolution,
  },

  {
    label: 'Processor',
    value: product.processor,
  },

  {
    label: 'RAM',
    value: product.ram,
  },

  {
    label: 'Built in memory',
    value: product.capacity,
  },

  {
    label: 'Camera',
    value: product.camera,
  },

  {
    label: 'Zoom',
    value: product.zoom,
  },

  {
    label: 'Cell',
    value: product.cell?.join(', '),
  },
];
