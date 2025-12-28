import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/types/Product';
import { createContext, FC, ReactNode } from 'react';

export interface FavouritesContextType {
  isFavourite: (productId: Product['id']) => boolean;
  toggleFavourite: (product: Product) => void;
  favourites: Product[];
}

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null,
);

interface Props {
  children: ReactNode;
}

export const FavouriteProvider: FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  const isFavourite = (productId: Product['id']) => {
    return favourites.some(item => item.id === productId);
  };

  const toggleFavourite = (product: Product) => {
    setFavourites(curFavourites => {
      const existProduct = curFavourites.findIndex(
        prd => prd.id === product.id,
      );

      if (existProduct !== -1) {
        return curFavourites.filter(item => item.id !== product.id);
      }

      return [...curFavourites, product];
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
