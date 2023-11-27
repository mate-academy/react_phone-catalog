import { createContext } from 'react';
import { FavoriteItem } from '../types/FavoriteItem';

type FavoriteType = {
  favorites: FavoriteItem[];
  setFavorites: ((value: FavoriteItem[]) => void) | null;
  handleAddToFavorite: ((value: FavoriteItem) => void) | null;
  handleRemoveFromFavorite: ((itemId: string) => void) | null;
};

export const FavoriteStorageContext = createContext<FavoriteType>({
  favorites: [],
  setFavorites: null,
  handleAddToFavorite: null,
  handleRemoveFromFavorite: null,
});
