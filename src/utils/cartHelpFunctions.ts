import { CartItem } from '../types/CartItem';

export const addItem = (cartItems: CartItem[], productToAdd: CartItem) => {
  const foundId = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (foundId) {
    return cartItems;
  }

  return [...cartItems, { ...productToAdd }];
};

export const removeItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem,
) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};
