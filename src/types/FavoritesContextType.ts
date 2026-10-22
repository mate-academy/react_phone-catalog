import type { Product } from './Product';

export type FavoritesContextType = {
  items: Product[];
  totalCount: number;
  isInFavorites: (productId: string) => boolean;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: string) => void;
};
