import React, { useEffect, useMemo, useState } from 'react';
import { Product } from './types/Product';
import { getAllProducts } from './api/getProducts';

type PropsContext = {
  products: Product[],
  favouritesProducts: Product[],
  setFavouritesProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

const FavouritStorage = localStorage.getItem('Favourit')
  ? JSON.parse(localStorage.getItem('Favourit') || '')
  : [];
const CartStorage = localStorage.getItem('Cart')
  ? JSON.parse(localStorage.getItem('Cart') || '')
  : [];

export const ProductContext = React.createContext<PropsContext>({
  products: [],
  favouritesProducts: [],
  setFavouritesProducts: () => {},
  cartProducts: [],
  setCartProducts: () => {},
});

type PropsProvider = {
  children: React.ReactNode,
};

export const ProductProvider: React.FC<PropsProvider> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favouritesProducts,
    setFavouritesProducts] = useState<Product[]>(FavouritStorage);
  const [cartProducts, setCartProducts] = useState<Product[]>(CartStorage);

  useEffect(() => {
    getAllProducts('./_new/products.json').then(setProducts);
  }, []);

  const value = useMemo(() => ({
    products,
    favouritesProducts,
    setFavouritesProducts,
    cartProducts,
    setCartProducts,
  }), [products, favouritesProducts, cartProducts]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
