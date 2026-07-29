import { createContext, useContext, useMemo, ReactNode } from 'react';
import { Product } from '@/types/Product';
import { useLocalStorageState } from '@/utils/useLocalStorageState';

type FavouritesContextValue = {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (itemId: string) => boolean;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useLocalStorageState<Product[]>(
    'favourites',
    [],
  );

  const value = useMemo<FavouritesContextValue>(
    () => ({
      favourites,
      toggleFavourite: product => {
        setFavourites(current =>
          current.some(item => item.itemId === product.itemId)
            ? current.filter(item => item.itemId !== product.itemId)
            : [...current, product],
        );
      },
      isFavourite: itemId => favourites.some(item => item.itemId === itemId),
    }),
    [favourites, setFavourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};
