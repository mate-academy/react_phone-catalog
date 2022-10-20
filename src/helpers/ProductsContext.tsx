import React, { useEffect, useMemo, useState } from 'react';
import { request } from './getProducts';
import { useLocalStorage } from './useLocalStorage';

import { Product } from '../types/Product';

type Context = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartItems: Product[],
  setCartItems : React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ProductsContext = React.createContext<Context>({
  products: [],
  setProducts: () => { },
  favorites: [],
  setFavorites: () => { },
  cartItems: [],
  setCartItems: () => { },
});

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  useEffect(() => {
    request().then(setProducts);
  }, []);

  const contextValue = useMemo(() => {
    return {
      products,
      setProducts,
      favorites,
      setFavorites,
      cartItems,
      setCartItems,
    };
  }, [favorites, products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
