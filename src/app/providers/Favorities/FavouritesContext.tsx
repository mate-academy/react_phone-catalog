import { useLocalStorage } from '@/shared/Hooks';
import { createContext, useContext, ReactNode } from 'react';

type FavouritesContextType = {
  favourites: string[];
  setFavourites: (value: string[] | ((prev: string[]) => string[])) => void;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

type FavouritesProviderProps = {
  children: ReactNode;
};

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [favourites, setFavourites] = useLocalStorage<string[]>('favourites', []);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
