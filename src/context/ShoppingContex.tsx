import React, { createContext, useState, useEffect } from 'react';
import { Device } from '../types/Device';
import { Products } from '../types/products';

type ShoppingItem = Products | Device;

interface ShoppingContexType {
  cartItems: ShoppingItem[];
  favoritItems: ShoppingItem[];
  increaseToCart: (item: ShoppingItem) => void;
  decreaseFromCart: (item: ShoppingItem) => void;
  deleteItems: (item: ShoppingItem) => void;
  toggleFavorite: (item: ShoppingItem) => void;
  clearCart: () => void;
  getCartTotal: () => { totalPrice: number; totalItems: number };
  toggleItems: (item: ShoppingItem) => void;
}

type Props = {
  children: React.ReactNode;
};

export const ShoppingContex = createContext({} as ShoppingContexType);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ShoppingItem[]>(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') as string)
      : [],
  );

  const [favoritItems, setFavoritItems] = useState<ShoppingItem[]>(
    localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites') as string)
      : [],
  );

  const increaseToCart = (item: ShoppingItem) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    }
  };

  const toggleFavorite = (item: ShoppingItem) => {
    const isItemFavorit = favoritItems.find(f => f.name === item.name);

    if (isItemFavorit) {
      setFavoritItems(favoritItems.filter(f => f.name !== item.name));
    } else {
      setFavoritItems([...favoritItems, { ...item }]);
    }
  };

  const toggleItems = (item: ShoppingItem) => {
    const isItem = cartItems.find(f => f.name === item.name);

    if (isItem) {
      setCartItems(cartItems.filter(f => f.name !== item.name));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const decreaseFromCart = (item: ShoppingItem) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (isItemInCart?.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };

  const deleteItems = (item: ShoppingItem) => {
    const deleteShoppingItems = cartItems.filter(cartItem => {
      return cartItem.id !== item.id;
    });

    setCartItems(deleteShoppingItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setFavoritItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (acc, item) => {
        const itemPrice = 'price' in item ? item.price : item.priceDiscount;

        return {
          totalPrice: acc.totalPrice + itemPrice * item.quantity,
          totalItems: acc.totalItems + item.quantity,
        };
      },
      { totalPrice: 0, totalItems: 0 },
    );
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('favorites', JSON.stringify(favoritItems));
  }, [cartItems, favoritItems]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const cartItems = localStorage.getItem('cartItems');
    const favorites = localStorage.getItem('favorites');

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }

    if (favorites) {
      setFavoritItems(JSON.parse(favorites));
    }
  }, []);

  return (
    <ShoppingContex.Provider
      value={{
        cartItems,
        increaseToCart,
        decreaseFromCart,
        clearCart,
        getCartTotal,
        deleteItems,
        toggleFavorite,
        favoritItems,
        toggleItems,
      }}
    >
      {children}
    </ShoppingContex.Provider>
  );
};
