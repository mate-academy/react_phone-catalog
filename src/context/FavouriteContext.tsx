import React, { useMemo } from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from '../helpers/useLocalStroage';

type Props = {
  children: React.ReactNode,
};

type ContextType = {
  favouriteProducts: Phone[],
  setFavouriteProducts: (value: Phone[]) => void,
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
  ), [favouriteProducts]);

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
