import { createContext } from 'react';
import { FavoriteItem } from '../types/FavoriteItem';

type FavoriteType = {
  favorites: FavoriteItem[];
  setFavorites: ((value: FavoriteItem[]) => void) | null;
  handleAddToFavorites: ((value: FavoriteItem) => void) | null;
  handleRemoveFromFavorites: ((itemId: string) => void) | null;
};

export const FavoriteStorageContext = createContext<FavoriteType>({
  favorites: [],
  setFavorites: null,
  handleAddToFavorites: null,
  handleRemoveFromFavorites: null,
});
