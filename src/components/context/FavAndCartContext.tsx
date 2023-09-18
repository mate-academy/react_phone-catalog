import React, { useMemo } from 'react';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { FavouriteType } from '../../types/FavouriteType';
import { CartType } from '../../types/CartType';

type FavAndCartContextType = {
  favourites: FavouriteType[],
  cart: CartType[],
  setFavourites: (data: FavouriteType[]) => void,
  setCart: (data: CartType[]) => void,
};

export const FavAndCartContext = React.createContext<FavAndCartContextType>({
  favourites: [],
  cart: [],
  setFavourites: () => {},
  setCart: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const FavAndCartProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<FavouriteType[]>(
    'fav', [],
  );

  const [cart, setCart] = useLocalStorage<CartType[]>('cart', []);

  const contextValue = useMemo(() => (
    {
      favourites,
      cart,
      setFavourites,
      setCart,
    }
  ), [favourites, cart]);

  return (
    <FavAndCartContext.Provider value={contextValue}>
      {children}
    </FavAndCartContext.Provider>
  );
};
