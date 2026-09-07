import { createContext } from 'react';

import { FavouritesContextType } from './types/FavouritesContextType';

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: {},
  getIsInFavourites: () => false,
  likeHandler: () => {},
});
