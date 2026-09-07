import { Product } from '../../../shared/types/Product/Product';

export const getProduct = (product: Product[], slug: string) => {
  return product.find(currentProduct => currentProduct.id === slug);
};
