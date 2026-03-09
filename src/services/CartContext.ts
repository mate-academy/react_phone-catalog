import { createContext } from 'react';

type CartContextType = {
  cart: string[];
  setCart: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);
