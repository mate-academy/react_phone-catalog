import { createContext } from 'react';
import { Product } from '../../utils/types/Product';

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
  totalCount: number;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
