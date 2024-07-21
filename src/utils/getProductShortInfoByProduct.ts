import { Product } from '../types/types';

export const getProductShortInfoById = (
  products: Product[],
  prodId: string | undefined,
) => products.find(({ itemId }) => itemId === prodId) || null;
