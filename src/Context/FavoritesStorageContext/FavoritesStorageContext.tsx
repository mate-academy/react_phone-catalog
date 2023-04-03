import { createContext } from 'react';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type FavoritesType = {
  favourites: FavoriteProduct[];
  setFavourites: ((valueToSave: FavoriteProduct[]) => void) | null;
  handleAddToFavorites: ((valueToSave: FavoriteProduct) => void) | null;
  handleRemoveFromFavorites: ((itemId: string) => void) | null;
};

export const FavoritesStorageContext = createContext<FavoritesType>({
  favourites: [],
  setFavourites: null,
  handleAddToFavorites: null,
  handleRemoveFromFavorites: null,
});
