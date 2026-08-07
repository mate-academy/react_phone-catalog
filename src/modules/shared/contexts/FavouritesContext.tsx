import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Products } from '../types/Products';
import { toggleFunction } from '../utils/functions';

interface FavouritesContextValue {
  favIconsId: Products['id'][];
  toggleFavourite: (id: Products['id']) => void;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favIconsId, setFavIconsId] = useLocalStorage<Products['id'][]>(
    'favouriteProduct',
    [],
  );

  const value: FavouritesContextValue = {
    favIconsId,
    toggleFavourite: id => toggleFunction(id, setFavIconsId),
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
