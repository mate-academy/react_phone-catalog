import { createContext } from 'react';

type FavoritesContextType = {
  favoritesItemsIds: string[];
  toggleFavorite: (itemId: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
