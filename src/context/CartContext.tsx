import { createContext } from 'react';

import { CartItem } from '../pages/Cart';
type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};
export const CartContext = createContext<CartContextType | null>(null);
