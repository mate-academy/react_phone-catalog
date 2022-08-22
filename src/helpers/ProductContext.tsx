import React, { useEffect, useMemo, useState } from 'react';
import * as request from '../api/request';
import { Product } from '../types/Product';

type Context = {
  products: Product[],
  setProducts: (products: Product[]
  | ((prevState: Product[]) => Product[])) => void,
  cart: Product[],
  setCart: (products: Product[]
  | ((prevState: Product[]) => Product[])) => void,
  favorites: Product[],
  setFavorites: (products: Product[]
  | ((prevState: Product[]) => Product[])) => void,
  addToLocalStorage: CallableFunction,
  removeFromLocalStorage: CallableFunction,
  getLocalStorageArray: CallableFunction,
  error: string,
};

export const ProductsContext = React.createContext<Context>({
  products: [],
  setProducts: () => { },
  cart: [],
  setCart: () => { },
  favorites: [],
  setFavorites: () => { },
  addToLocalStorage: () => { },
  removeFromLocalStorage: () => { },
  getLocalStorageArray: () => { },
  error: '',
});

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  const getLocalStorageArray = (key: string) => {
    const jsonObj = window.localStorage.getItem(key);

    return !jsonObj ? [] : JSON.parse(jsonObj);
  };

  useEffect(() => {
    setCart(getLocalStorageArray('cart'));
    setFavorites(getLocalStorageArray('favorites'));
  }, []);

  useEffect(() => {
    request.getProducts()
      .then(setProducts)
      .catch(err => setError(err.message));
  }, []);

  const addToLocalStorage = (key: string, product: Product) => {
    const array: Product[] = getLocalStorageArray(key);

    array.push(product);

    window.localStorage.setItem(key, JSON.stringify(array));

    if (key === 'cart') {
      setCart(array);
    } else {
      setFavorites(array);
    }
  };

  const removeFromLocalStorage = (key: string, product: Product) => {
    const array: Product[] = getLocalStorageArray(key);

    array.push(product);

    window.localStorage.setItem(key, JSON.stringify(array
      .filter(item => item.id !== product.id)));

    if (key === 'cart') {
      setCart(array
        .filter(item => item.id !== product.id));
    } else {
      setFavorites(array
        .filter(item => item.id !== product.id));
    }
  };

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    cart,
    setCart,
    favorites,
    setFavorites,
    addToLocalStorage,
    removeFromLocalStorage,
    getLocalStorageArray,
    error,
  }), [products, cart, favorites, error]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
