import { CategoryProduct } from '../types/CategoryProduct';

export const getCharacteristics = (product: CategoryProduct) => [
  { title: 'Screen', value: product.screen },
  { title: 'Resolution', value: product.resolution },
  { title: 'Processor', value: product.processor },
  { title: 'RAM', value: product.ram },
];

export const getTechSpecs = (product: CategoryProduct) => [
  { title: 'Processor', value: product.processor },
  { title: 'RAM', value: product.ram },
  {
    title: product.category === 'accessories' ? 'Case size' : 'Built in memory',
    value: product.capacity,
  },
  { title: 'Camera', value: product.camera },
  { title: 'Zoom', value: product.zoom },
  { title: 'Cell', value: product.cell },
];
