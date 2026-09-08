import { ProductData } from '../types/ProductData';

export const getSpecifications = (product: ProductData | null) => {
  if (!product) {
    return [];
  }

  return [
    { key: 'Screen', value: product.screen },
    { key: 'Resolution', value: product.resolution },
    { key: 'Processor', value: product.processor },
    { key: 'RAM', value: product.ram },
  ];
};
