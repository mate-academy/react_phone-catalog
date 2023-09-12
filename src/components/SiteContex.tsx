/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import { Product } from '../types/product';
import { getProduct } from '../utils/fetchProduct';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Cart } from '../types/Cart';

type SiteContextType = {
  cart: Cart[];
  products: Product[];
  favourites: Product[]
  setCart: (v: Cart[]) => void
  setFavourites: (v: Product[]) => void
};

export const SiteContext = React.createContext<SiteContextType>({
  cart: [],
  products: [],
  favourites: [],
  setCart: () => {},
  setFavourites: () => {},
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

  useEffect(() => {
    getProduct().then(items => setProducts(items));
  }, []);

  const value = useMemo(() => ({
    cart,
    products,
    favourites,
    setCart,
    setFavourites,
  }), [products, favourites, cart]);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};
