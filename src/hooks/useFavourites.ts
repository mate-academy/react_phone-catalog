// hooks/useWishlist.ts
import { useContext } from 'react';

import { FavouritesContext } from '../context/FavouritesContext';

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }

  return context;
};
