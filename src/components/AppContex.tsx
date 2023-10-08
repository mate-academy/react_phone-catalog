/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Cart } from '../types/Cart';
import { getProduct } from '../utils/fetchProduct';

type AppContextType = {
  cart: Cart[];
  products: Product[];
  favourites: Product[]
  setCart: (v: Cart[]) => void
  setFavourites: (v: Product[]) => void
  isLoading: boolean
};

export const AppContext = React.createContext<AppContextType>({
  cart: [],
  products: [],
  favourites: [],
  setCart: () => {},
  setFavourites: () => {},
  isLoading: false,
});

type Props = {
  children: React.ReactNode
};

export const SiteProvider: React.FC<Props> = ({
  children,
}) => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [favourites, setFavourites] = useLocalStorage<Product[]>('favourites', []);
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProduct()
      .then(items => setProducts(items))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(() => ({
    cart,
    products,
    favourites,
    setCart,
    setFavourites,
    isLoading,
  }), [products, favourites, cart]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
