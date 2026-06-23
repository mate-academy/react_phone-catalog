import { createContext } from 'react';
import { ProductCardData } from '../shared/types/ProductCardData';

export type CartItem = {
  product: ProductCardData;
  amount: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);
