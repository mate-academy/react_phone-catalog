import { createContext } from 'react';
import { Phone } from '../Types/Types';
import { Tablet } from '../Types/Tablet';
import { Accessories } from '../Types/Accessories';
import './CartContext';

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
