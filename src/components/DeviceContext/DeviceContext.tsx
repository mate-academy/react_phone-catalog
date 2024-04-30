import React, { createContext, useContext, useEffect, useState } from 'react';
import { DeviceContextType } from '../../types/DeviceContextType';
import { Product } from '../../types/product';

type Props = {
  children: React.ReactNode;
};

export type CartProps = {
  image: string;
  name: string;
  price: number;
  id: string;
  count: number;
};

export const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined,
);

export const useDeviceContext = (): DeviceContextType => {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

export const DeviceProvider: React.FC<Props> = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<CartProps[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedFavourites = localStorage.getItem('favourites');

    if (storedCart && storedCart !== 'undefined') {
      setShoppingCart(JSON.parse(storedCart));
    }

    if (storedFavourites && storedFavourites !== 'undefined') {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addProductToCart = (newCartProduct: CartProps) => {
    setShoppingCart([...shoppingCart, newCartProduct]);
  };

  const addProductToFavourites = (product: Product) => {
    setFavourites([...favourites, product]);
  };

  const removeProductFromCart = (id: string) => {
    setShoppingCart(shoppingCart.filter(product => product.id !== id));
  };

  const removeProductFromFavourites = (id: number) => {
    setFavourites(favourites.filter(product => product.id !== id));
  };

  const handleIncrement = (item: CartProps) => {
    const updatedCart = shoppingCart.map(cartItem => {
      if (cartItem.id === item.id && cartItem.count < 9) {
        return {
          ...cartItem,
          count: cartItem.count + 1,
        };
      }

      return cartItem;
    });

    setShoppingCart(updatedCart);
  };

  const handleDecrement = (item: CartProps) => {
    const updatedCart = shoppingCart.map(cartItem => {
      if (cartItem.id === item.id && cartItem.count > 1) {
        return {
          ...cartItem,
          count: cartItem.count - 1,
        };
      }

      return cartItem;
    });

    setShoppingCart(updatedCart);
  };

  const handleClearCart = () => {
    setShoppingCart([]);
  };

  return (
    <DeviceContext.Provider
      value={{
        addProductToCart,
        addProductToFavourites,
        removeProductFromCart,
        removeProductFromFavourites,
        shoppingCart,
        favourites,
        handleIncrement,
        handleDecrement,
        handleClearCart,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
