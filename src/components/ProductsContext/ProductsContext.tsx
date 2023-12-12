import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';

const initiatFavorites: Product[] = [];
const initiatcarts: CartProduct[] = [];

interface ProductsContextType {
  favorites: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  carts: CartProduct[],
  setCarts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export const ProductsContext = React.createContext<ProductsContextType>({
  favorites: initiatFavorites,
  setFavorites: () => { },
  carts: initiatcarts,
  setCarts: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState(initiatFavorites);
  const [carts, setCarts] = useState(initiatcarts);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCarts = localStorage.getItem('carts');

    if (savedCarts) {
      setCarts(JSON.parse(savedCarts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [favorites, carts]);

  const value = useMemo(() => ({
    favorites,
    setFavorites,
    carts,
    setCarts,
  }), [favorites, carts]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
