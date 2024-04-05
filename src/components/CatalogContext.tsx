import React, { useMemo, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../helper/Cart';
import { Product } from '../types/Product';

export type ContextType = {
  cartItems: CartItem[];
  setCartItems: (value: CartItem[]) => void;
  favoriteProducts: Product[];
  setFavoriteProducts: (value: Product[]) => void;
};

export const CatalogContext = React.createContext<ContextType>({
  cartItems: [],
  setCartItems: () => {},
  favoriteProducts: [],
  setFavoriteProducts: () => {},
});

export type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    [],
  );

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const values = useMemo(
    () => ({
      cartItems,
      setCartItems,
      favoriteProducts,
      setFavoriteProducts,
    }),
    [cartItems, setCartItems, favoriteProducts, setFavoriteProducts],
  );

  return (
    <CatalogContext.Provider value={values}>{children}</CatalogContext.Provider>
  );
};
