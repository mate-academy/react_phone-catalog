import { useLocalStorage } from '@/shared/Hooks';
import { ReactNode } from 'react';
import { FavouritesContext } from './FavouritesContext';

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useLocalStorage<string[]>('favourites', []);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}
