/* eslint-disable max-len */
import {
  createContext, useMemo,
} from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

type DefaultContextValue = {
  favouritesProducts: Product[],
  setFavouritesProducts: (v: Product[]) => void,
  countOfFavourites: number,
};

export const FavouritesProductsContext = createContext<DefaultContextValue>({
  favouritesProducts: [],
  setFavouritesProducts: () => {},
  countOfFavourites: 0,
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProductsProvider: React.FC<Props> = ({ children }) => {
  const [favouritesProducts, setFavouritesProducts] = useLocalStorage<Product[]>('favourites', []);

  const countOfFavourites = favouritesProducts.length;

  const value = useMemo(() => ({
    favouritesProducts,
    setFavouritesProducts,
    countOfFavourites,
  }), [favouritesProducts, countOfFavourites]);

  return (
    <FavouritesProductsContext.Provider value={value}>
      {children}
    </FavouritesProductsContext.Provider>
  );
};
