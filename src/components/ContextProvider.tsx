import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { ProductInCart } from '../types/ProductInCart';

type ContextType = {
  cart: ProductInCart[] | null,
  favorite: Product[] | null,
  cartAdd: (product: Product) => void,
  cartChangeQuantity: (product: ProductInCart, step: number) => void,
  cartDelete: (product: ProductInCart) => void,
  favoriteAdd: (product: Product) => void,
  notification: string | null,
  setNotification: (value: string | null) => void,
  query: string,
  setQuery: (query: string) => void,
};

export const Context = createContext({} as ContextType);

export const ContextProvider: React.FC = ({ children }) => {
  const getLocalStorage = (key: string) => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return null;
  };

  const [cart, setCart]
    = useState<ProductInCart[] | null>(getLocalStorage('cart'));
  const [favorite, setFavorite] = useState(getLocalStorage('favorite'));
  const [notification, setNotification] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favorite));
  }, [favorite]);

  const cartAdd = (productToAdd: Product) => {
    setCart((prev: ProductInCart[] | null) => {
      if (!prev) {
        const newCart = [{
          ...productToAdd,
          quantity: 1,
        }];

        return newCart;
      }

      const existingProduct = prev.some((product: ProductInCart) => (
        product.id === productToAdd.id
      ));

      if (existingProduct) {
        setNotification('Product is already added to the cart');

        return [...prev];
      }

      const newProduct: ProductInCart = {
        ...productToAdd,
        quantity: 1,
      };

      return [...prev, newProduct];
    });
  };

  const cartChangeQuantity = (productToChange: ProductInCart, step: number) => {
    setCart((prev: ProductInCart[] | null) => {
      if (prev) {
        const existingProduct = productToChange;

        existingProduct.quantity += step;

        return [...prev];
      }

      return prev;
    });
  };

  const cartDelete = (productToDelete: ProductInCart) => {
    setCart((prev: ProductInCart[] | null) => {
      if (!prev) {
        return prev;
      }

      if (prev.length === 1) {
        return null;
      }

      return prev.filter(product => product.id !== productToDelete.id);
    });
  };

  const favoriteAdd = (productToAdd: Product) => {
    setFavorite((prev: Product[]) => {
      if (!prev) {
        return [productToAdd];
      }

      if (!prev.includes(productToAdd)) {
        return [...prev, productToAdd];
      }

      if (prev.includes(productToAdd) && prev.length === 1) {
        return null;
      }

      return prev.filter(product => product.id !== productToAdd.id);
    });
  };

  const value: ContextType = {
    cart,
    favorite,
    cartAdd,
    cartChangeQuantity,
    cartDelete,
    favoriteAdd,
    notification,
    setNotification,
    query,
    setQuery,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
