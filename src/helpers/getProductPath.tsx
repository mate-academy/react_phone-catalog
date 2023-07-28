import { Product } from '../types/Product';

export const getProductPath = (product: Product) => {
  switch (product.type) {
    case 'phone':
      return `phones/${product.id}`;

    case 'tablet':
      return `tablets/${product.id}`;

    case 'accessory':
      return `accessories/${product.id}`;
    default:
      return '*';
  }
};
