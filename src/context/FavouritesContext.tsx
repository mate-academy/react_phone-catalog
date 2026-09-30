import React, { createContext, useContext } from 'react';
import { Product } from './CartContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavouritesContextType {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (productId: string | number) => boolean;
  favouritesCount: number;
}

const LOCAL_STORAGE_KEY = 'nice_gadgets_favourites';

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    LOCAL_STORAGE_KEY,
    [],
  );

  const toggleFavourite = (product: Product) => {
    setFavourites(prevFavourites => {
      const productId = String(product.id);
      const exist = prevFavourites.some(item => String(item.id) === productId);

      if (exist) {
        return prevFavourites.filter(item => String(item.id) !== productId);
      }

      return [...prevFavourites, product];
    });
  };

  const isFavourite = (productId: string | number) => {
    return favourites.some(item => String(item.id) === String(productId));
  };

  const favouritesCount = favourites.length;

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        favouritesCount,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites should be used inside <FavouritesProvider>');
  }

  return context;
};
