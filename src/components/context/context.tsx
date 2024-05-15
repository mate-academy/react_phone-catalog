import React, { createContext, useContext, useEffect, useState } from 'react';
import { InitialContext } from '../../types/Context';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

type Props = {
  children: React.ReactNode;
};

export const AppContext = createContext<InitialContext | undefined>(undefined);

export const useAppContext = (): InitialContext => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
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

  const addProductToCart = (newCartProduct: CartItem) => {
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

  const handleIncrement = (item: CartItem) => {
    const updatedCart = shoppingCart.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          count: cartItem.count + 1,
        };
      }

      return cartItem;
    });

    setShoppingCart(updatedCart);
  };

  const handleDecrement = (item: CartItem) => {
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

  const cartLength = () => {
    let total = 0;

    shoppingCart.forEach(item => {
      total += item.count;
    });

    return total;
  };

  return (
    <AppContext.Provider
      value={{
        shoppingCart,
        favourites,
        addProductToCart,
        addProductToFavourites,
        removeProductFromCart,
        removeProductFromFavourites,
        handleIncrement,
        handleDecrement,
        handleClearCart,
        cartLength,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
