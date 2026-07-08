import { createContext } from 'react';

type CartContextType = {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FavouritesContext = createContext<CartContextType | null>(null);
