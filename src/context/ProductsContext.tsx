import React from 'react';
import { useLocalstorage } from '../hooks/useLocalstorage';
import { Cart } from '../types/Cart';

type Props = {
  cartList: Cart[],
  setCartList: (arg: Cart[]) => void,
  favouritesList: string[],
  setFavouritesList: (arg: string[]) => void,
};

export const ProductsContext
= React.createContext<Props>({
  cartList: [],
  setCartList: () => {},
  favouritesList: [],
  setFavouritesList: () => {},
});

export const ProductProvider: React.FC<React.ReactNode>
= ({ children }) => {
  const [cartList, setCartList] = useLocalstorage<Cart>('cartList', []);
  const [favouritesList, setFavouritesList]
  = useLocalstorage<string>('favourites', []);

  const contextValue = {
    cartList,
    setCartList,
    favouritesList,
    setFavouritesList,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
