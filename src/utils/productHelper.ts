import { Product } from '../api/products';

export const getProductImage = (product: Product): string => {
  const imagePath =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image || '';

  if (!imagePath) {
    return '';
  }

  return imagePath.startsWith('http') || imagePath.startsWith('/')
    ? imagePath
    : `/${imagePath}`;
};
