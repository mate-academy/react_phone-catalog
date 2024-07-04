import { Products } from '../types/ContextType/Products';

export const availableFav = (product: Products, favorites: Products[]) => {
  return !!favorites.find(item => item.itemId === product.itemId);
};
