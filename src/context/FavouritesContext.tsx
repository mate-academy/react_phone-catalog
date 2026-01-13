import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/types/Product';
import { createContext, FC, ReactNode } from 'react';

export interface FavouritesContextType {
  isFavourite: (productId: Product['id']) => boolean;
  toggleFavourite: (productId: Product['id']) => void;
  favourites: Product['id'][];
}

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null,
);

interface Props {
  children: ReactNode;
}

export const FavouriteProvider: FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product['id'][]>(
    'favourites',
    [],
  );

  const isFavourite = (productId: Product['id']) => {
    return favourites.some(id => id === productId);
  };

  const toggleFavourite = (productId: Product['id']) => {
    setFavourites(curFavourites => {
      const existProduct = curFavourites.findIndex(id => id === productId);

      if (existProduct !== -1) {
        return curFavourites.filter(id => id !== productId);
      }

      return [...curFavourites, productId];
    });
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isFavourite,
        toggleFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
