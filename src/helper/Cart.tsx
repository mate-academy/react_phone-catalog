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

// export const addCartItem = (cartItems: CartItem[], product: ProductDetails) => {
//   const cartItemsCopy = [...cartItems];
//   const chosenItemIndex = cartItemsCopy.findIndex(
//     item => item.item.id === product.id,
//   );

//   if (chosenItemIndex !== -1) {
//     cartItemsCopy[chosenItemIndex].quantity += 1;
//   } else {
//     cartItemsCopy.push({
//       id: cartItems.length + 1,
//       item: product,
//       quantity: 1,
//     });
//   }

//   return cartItemsCopy;
// };

// export const removeCartItem = (cartItems: CartItem[], product: ProductDetails) => {
//   const cartItemsCopy = [...cartItems];
//   const chosenItemIndex = cartItemsCopy.findIndex(
//     item => item.item.id === product.id,
//   );
// }

// function isInCart(productId) {
//   return cartItems.some(item => item.product.id === productId);
// }

// function updateQuantity(productId: number, newQuantity: number) {
//   const itemToUpdateIndex = cartItems.findIndex(
//     item => item.item.id === productId,
//   );

//   if (itemToUpdateIndex !== -1) {
//     cartItems[itemToUpdateIndex].quantity = newQuantity;
//   }
// }

// function removeFromCart(productId) {
//   const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
//   cartItems.length = 0;
//   cartItems.push(...updatedCartItems);
// }

// function getCartContents() {
//   return [...cartItems]; // Return a copy to prevent direct manipulation of internal state
// }
