import React, { createContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import {
  CartContextType,
  CartProduct,
  FavouriteContextType,
  ProductListContextType,
} from './types/Context';
import { Product } from './types/Product';

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
});

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
});

export const ProductListContext = createContext<ProductListContextType>({
  productList: [],
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct>(
    'cartProducts',
    [],
  );
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product>(
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
