import { Product } from '../types';

export const findProduct = (products: Product[], id: string | undefined) => {
  const item = products.find(product => product.id === id);

  return item;
};
