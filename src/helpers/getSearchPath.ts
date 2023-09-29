import { Product } from '../Types/Product';

export const getProductPath = (product:Product) => {
  switch (product.type) {
    case 'phone':
      return `phones/${product.id}`;

    case 'tablet':
      return `tablets/${product.id}`;

    case 'accessories':
      return `accessories/${product.id}`;

    default:
      return '*';
  }
};
