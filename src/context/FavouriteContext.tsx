import React, { useMemo } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { ProductCardType } from '../types/ProductCardType';

type Props = {
  children: React.ReactNode,
};

type ContextType = {
  favouriteProducts: ProductCardType[],
  setFavouriteProducts: (value: ProductCardType[]) => void,
};

export const FavouriteContext = React.createContext<ContextType>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
});

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts]
    = useLocalStorage('favourite', []);

  const value = useMemo(() => (
    { favouriteProducts, setFavouriteProducts }
  ), [favouriteProducts, setFavouriteProducts]);

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
