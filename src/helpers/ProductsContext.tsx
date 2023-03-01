import React, { useEffect, useState } from 'react';
import { CartItemInfo } from '../types/CartItemInfo';
import { Product } from '../types/Product';

type ContextType = {
  cartItems: CartItemInfo[],
  favourites: Product[],
  addProductToCart: (product: Product) => void,
  deleteProductFromCart: (product: Product) => void,
  addProductToFavourites: (product: Product) => void,
  isInCart: (product: Product) => boolean,
  isInFavourites: (product: Product) => boolean,
  increaseQuantity: (product: Product) => void,
  decreaseQuantity: (product: Product) => void,
};

export const ProductsContext = React.createContext({} as ContextType);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
  const initialItems = cartItemsFromLocalStorage
    ? JSON.parse(cartItemsFromLocalStorage)
    : [];

  const favouritesFromLocalStorage = localStorage.getItem('favourites');
  const initialFavourites = favouritesFromLocalStorage
    ? JSON.parse(favouritesFromLocalStorage)
    : [];

  const [cartItems, setCartItems] = useState<CartItemInfo[]>(initialItems);
  const [favourites, setFavourites] = useState<Product[]>(initialFavourites);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addProductToCart = (product: Product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      return setCartItems([
        ...cartItems,
        { product, id: product.id, quantity: 1 },
      ]);
    }

    return setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  const deleteProductFromCart = (product: Product) => {
    return setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  const addProductToFavourites = (product: Product) => {
    if (!favourites.find(item => item.id === product.id)) {
      return setFavourites([...favourites, product]);
    }

    return setFavourites(favourites.filter(item => item.id !== product.id));
  };

  const isInCart = (product: Product) => {
    return !!cartItems.find(item => item.id === product.id);
  };

  const isInFavourites = (product: Product) => {
    return !!favourites.find(item => item.id === product.id);
  };

  const increaseQuantity = (product: Product) => {
    setCartItems(cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    }));
  };

  const decreaseQuantity = (product: Product) => {
    setCartItems(cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    }));
  };

  return (
    <ProductsContext.Provider value={{
      cartItems,
      favourites,
      addProductToCart,
      deleteProductFromCart,
      addProductToFavourites,
      isInCart,
      isInFavourites,
      increaseQuantity,
      decreaseQuantity,
    }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
