/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import {
  AggregatedProductListContextType,
  CartContextType,
  CartProduct,
  FavouriteContextType,
  ProductListContextType,
  ThemeContextType,
} from './types/Context';
import { Product, ProductOtherData } from './types/Product';
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
  setProductList: () => {},
});

export const AggregatedProductListContext =
  createContext<AggregatedProductListContextType>({
    aggregatedProductList: [],
    setAggregatedProductList: () => {},
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || ThemeType.light;
  });

  const [productList, setProductList] = useState<Product[]>([]);
  const [aggregatedProductList, setAggregatedProductList] = useState<
    ProductOtherData[]
  >([]);

  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct>(
    ContextName.cartProducts,
    [],
  );

  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product>(
    ContextName.favouriteProducts,
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ProductListContext.Provider value={{ productList, setProductList }}>
        <AggregatedProductListContext.Provider
          value={{ aggregatedProductList, setAggregatedProductList }}
        >
          <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            <FavouriteContext.Provider
              value={{ favouriteProducts, setFavouriteProducts }}
            >
              {children}
            </FavouriteContext.Provider>
          </CartContext.Provider>
        </AggregatedProductListContext.Provider>
      </ProductListContext.Provider>
    </ThemeContext.Provider>
  );
};
