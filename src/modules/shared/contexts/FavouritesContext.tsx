import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Products } from '../types/Products';
import { toggleFunction } from '../utils/functions';

interface FavouritesContextValue {
  addedDevice: Products['id'][];
  favIconsId: Products['id'][];
  toggleAdded: (id: Products['id']) => void;
  toggleFavourite: (id: Products['id']) => void;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [addedDevice, setAddedDevice] = useLocalStorage<Products['id'][]>(
    'addedProduct',
    [],
  );
  const [favIconsId, setFavIconsId] = useLocalStorage<Products['id'][]>(
    'favouriteProduct',
    [],
  );

  const value: FavouritesContextValue = {
    addedDevice,
    favIconsId,
    toggleAdded: id => toggleFunction(id, setAddedDevice),
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
