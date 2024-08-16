import { ProductInfo } from '../types/ProductInfo';

export const getAvailableColors = (product: ProductInfo | undefined) => {
  if (!product) {
    return [];
  }

  return product.colorsAvailable || [];
};
