import { createContext } from 'react';
import { Phone, Tablet, Accessories } from '../Types/BaseItem';

export interface CartItem {
  item: Phone | Tablet | Accessories;
  quantity: number;
}

export interface CartContextProps {
  cart: CartItem[];
  favorites: (Phone | Tablet | Accessories)[];
  addToCart: (item: Phone | Tablet | Accessories) => void;
  addToFavorites: (item: Phone | Tablet | Accessories) => void;
  removeFromCart: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  favouritesCount: number;
  clearCart: () => void;
  clearFavorites: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
);
