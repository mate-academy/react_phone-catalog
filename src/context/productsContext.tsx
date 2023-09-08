import React, { ReactNode, useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts } from '../api/products';

type ProductContext = {
  products: Product[],
  favourites: Product [],
  setFavourites: (product: Product[]) => void,
  cart: Product[],
  setToCart: (product: Product[]) => void,
};

export const ProductsContext = React
  .createContext<ProductContext>({} as ProductContext);

type Props = {
  children: ReactNode,
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [cart, setToCart] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  const value = {
    products,
    favourites,
    setFavourites,
    setProducts,
    cart,
    setToCart,
  };

  return (
    <ProductsContext.Provider
      value={value}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (
):ProductContext => React.useContext(ProductsContext);
