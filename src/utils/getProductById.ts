import { Product } from '../types/product';

export const getProductById = (products: Product[], productId: string) => {
  return products.find(product => product.itemId === productId);
};
