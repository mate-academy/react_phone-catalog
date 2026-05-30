import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types';
import { getProducts } from '../utils/api';

type InitialStateType = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  setIsError: (isLoading: boolean) => void;
  setCurrentPath: (currPath: string) => void;
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductsContext = React.createContext<InitialStateType | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  const storedCartProducts = localStorage.getItem('cartProducts');
  const existingCartProducts: Product[] = storedCartProducts
    ? JSON.parse(storedCartProducts)
    : [];
  const [cartProducts, setCartProducts] =
    useState<Product[]>(existingCartProducts);

  const storedFavoriteProducts = localStorage.getItem('favorites');
  const existingFavorites: Product[] = storedFavoriteProducts
    ? JSON.parse(storedFavoriteProducts)
    : [];
  const [favorites, setFavorites] = useState<Product[]>(existingFavorites);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!isError) {
      setIsLoading(true);
      getProducts()
        .then(result => {
          setProducts(result);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPath, isError]);

  const contextValue = useMemo(
    () => ({
      products,
      isLoading,
      isError,
      setIsError,
      setCurrentPath,
      cartProducts,
      setCartProducts,
      favorites,
      setFavorites,
    }),
    [products, isLoading, isError, cartProducts, favorites],
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): InitialStateType => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
