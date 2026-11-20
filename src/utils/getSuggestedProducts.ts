import { request } from './fetchResponse';

import { Product } from '../types/Product';

export const getSuggestedProducts = async (
  currentItemId: string,
  count = 8,
): Promise<Product[]> => {
  const products = await request<Product[]>('/products.json');

  return products
    .filter(product => product.itemId !== currentItemId)
    .map(product => ({ product, order: Math.random() }))
    .sort((left, right) => left.order - right.order)
    .slice(0, count)
    .map(({ product }) => product);
};
