import { useContext } from 'react';
import { FavoriteContext } from '../store/FavoriteContext';

export const useFavorite = () => {
  const storeContext = useContext(FavoriteContext);

  if (!storeContext) {
    throw new Error(
      'useFavorite must be used inside a FavoriteContextProvider',
    );
  }

  return storeContext;
};
