import { Product } from '../types/types';

export const getIdForProduct = (products: Product[], productId: string) =>
  products.find(({ itemId }) => itemId === productId)?.id || null;
