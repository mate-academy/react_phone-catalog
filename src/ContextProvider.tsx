import React, { createContext, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import {
  CartContextType,
  CartProduct,
  FavouriteContextType,
  ProductListContextType,
  ThemeContextType,
} from './types/Context';
import { Product } from './types/Product';
import { ContextName } from './types/ContextName';
import { ThemeType } from './types/ThemeType';

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

export const ThemeContext = createContext<ThemeContextType>({
  theme: '',
  setTheme: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct>(
    ContextName.cartProducts,
    [],
  );
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product>(
    ContextName.favouriteProducts,
    [],
  );

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || ThemeType.light;
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CartContext.Provider value={{ cartProducts, setCartProducts }}>
        <FavouriteContext.Provider
          value={{ favouriteProducts, setFavouriteProducts }}
        >
          {children}
        </FavouriteContext.Provider>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
};
