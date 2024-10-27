import React, { createContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { CartContextType, FavouriteContextType } from './types/Context';

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
});

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage(
    'favouriteProducts',
    [],
  );

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      <FavouriteContext.Provider
        value={{ favouriteProducts, setFavouriteProducts }}
      >
        {children}
      </FavouriteContext.Provider>
    </CartContext.Provider>
  );
};
