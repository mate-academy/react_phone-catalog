import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const addedToCart = (cartItems: CartItem[], id: string) => {
  return cartItems.some(item => item.item.itemId === id);
};

export const handleAddToCartClick = (
  cartItems: CartItem[],
  setCartItems: (cartItems: CartItem[]) => void,
  item: Product,
) => {
  if (!addedToCart(cartItems, item.itemId)) {
    setCartItems([
      ...cartItems,
      {
        id: cartItems.length + 1,
        item,
        quantity: 1,
      },
    ]);
  } else {
    const updatedCartItems = cartItems.filter(
      cartItem => cartItem.item.id !== item.id,
    );

    setCartItems(updatedCartItems);
  }
};
