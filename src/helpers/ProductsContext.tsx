import React, { useEffect, useState } from 'react';
import { CartItemInfo } from '../types/CartItemInfo';
import { Product } from '../types/Product';

type ContextType = {
  cartItems: CartItemInfo[],
  favorites: Product[],
  addProductToCart: (product: Product) => void,
  deleteProductFromCart: (product: Product) => void,
  addProductToFavorites: (product: Product) => void,
  isInCart: (product: Product) => boolean,
  isInFavorites: (product: Product) => boolean,
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

  const favoritesFromLocalStorage = localStorage.getItem('favorites');
  const initialFavorites = favoritesFromLocalStorage
    ? JSON.parse(favoritesFromLocalStorage)
    : [];

  const [cartItems, setCartItems] = useState<CartItemInfo[]>(initialItems);
  const [favorites, setFavorites] = useState<Product[]>(initialFavorites);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const addProductToFavorites = (product: Product) => {
    if (!favorites.find(item => item.id === product.id)) {
      return setFavorites([...favorites, product]);
    }

    return setFavorites(favorites.filter(item => item.id !== product.id));
  };

  const isInCart = (product: Product) => {
    return !!cartItems.find(item => item.id === product.id);
  };

  const isInFavorites = (product: Product) => {
    return !!favorites.find(item => item.id === product.id);
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
      favorites,
      addProductToCart,
      deleteProductFromCart,
      addProductToFavorites,
      isInCart,
      isInFavorites,
      increaseQuantity,
      decreaseQuantity,
    }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
