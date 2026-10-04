import { Product } from '@/shared/types/Product';

export const getProductTitle = (product: Product) => {
  const index = product.name.indexOf(product.capacity);

  return index === -1 ? product.name : product.name.slice(0, index).trim();
};
