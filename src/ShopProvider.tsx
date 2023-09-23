import React, { useMemo } from 'react';
import { getProductsWithoutDeley } from './api/fetchClient';
import { LocalStorageKeys } from './data/localStorageKeys';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ShopContext } from './ShopContext';
import { ChangeType } from './types/ChangeType';

type Props = {
  children: React.ReactNode;
};

export const ShopProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage(LocalStorageKeys.cart, []);
  const [favourites, setFavourites] = useLocalStorage(
    LocalStorageKeys.favourites, [],
  );

  const findProduct = (id: string) => {
    return getProductsWithoutDeley()
      .then(productsFromServer => {
        return productsFromServer.find(p => p.phoneId === id);
      });
  };

  const addToCart = (id: string): void => {
    findProduct(id)
      .then(product => {
        if (product) {
          const newProduct = { ...product };

          newProduct.count = 1;
          const newCart = [...cart, newProduct];

          setCart(newCart);
        }
      });
  };

  const addToFavourites = (id: string): void => {
    findProduct(id)
      .then(product => {
        if (product) {
          const newProduct = { ...product };

          newProduct.count = 1;
          const newFavourites = [...favourites, newProduct];

          setFavourites(newFavourites);
        }
      });
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(p => p.phoneId !== id);

    setCart(newCart);
  };

  const removeFromFavourites = (id: string) => {
    const newFavourites = favourites.filter(p => p.phoneId !== id);

    setFavourites(newFavourites);
  };

  const changeValueInCart = (type: ChangeType, id: string) => {
    const product = cart.find(p => p.phoneId === id);
    const cartWithoutProduct = cart.filter(p => p.phoneId !== id);

    if (product) {
      const newProduct = { ...product };

      if (type === '+') {
        newProduct.count = newProduct.count
          ? newProduct.count + 1
          : 1;
      }

      if (type === '-') {
        newProduct.count = newProduct.count
          ? newProduct.count - 1
          : 1;
      }

      const newCart = [...cartWithoutProduct, newProduct];

      setCart(newCart);
    }
  };

  const state = useMemo(() => ({
    cart,
    favourites,
    addToCart,
    addToFavourites,
    removeFromCart,
    removeFromFavourites,
    changeValueInCart,
  }), [cart, favourites]);

  return (
    <ShopContext.Provider value={state}>
      {children}
    </ShopContext.Provider>
  );
};
