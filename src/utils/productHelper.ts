import { Product } from '../api/products';

export const getProductImage = (product: Product): string => {
  const imagePath =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image || '';

  if (!imagePath) {
    return '';
  }

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return `./${imagePath.slice(1)}`;
  }

  return `./${imagePath}`;
};
