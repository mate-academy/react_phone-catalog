import { createContext } from 'react';
import { ProductCardData } from '../shared/types/ProductCardData';
type FavoritesContextType = {
  favorites: ProductCardData[];
  setFavorites: React.Dispatch<React.SetStateAction<ProductCardData[]>>;
};
export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
