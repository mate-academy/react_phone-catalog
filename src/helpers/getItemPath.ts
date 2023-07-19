import { Product } from '../types/Product';

export const getItemPath = (product: Product) => {
  let absolutePath = '/';

  absolutePath += `${product.type}s/`;
  absolutePath += product.id;

  return absolutePath;
};
