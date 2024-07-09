import { Product } from '../types/ContextType/Product';

export const availableFav = (product: Product, favorites: Product[]) => {
  return !!favorites.find(item => item.itemId === product.itemId);
};
