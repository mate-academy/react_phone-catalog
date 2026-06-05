import { createContext, useContext } from 'react';

type FavouritesContextType = {
  favourites: string[];
  setFavourites: (value: string[] | ((prev: string[]) => string[])) => void;
};

export const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
