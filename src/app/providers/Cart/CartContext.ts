import { createContext, useContext } from 'react';
import type { ProductInCart } from '@/shared/type';

export type CartContextType = {
  cart: ProductInCart[];
  toggleCartProduct: (id: string) => void;
  setCountCartProduct: (
    id: string,
    newValue: number | ((prev: number) => number),
  ) => void;
  deleteCartProduct: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
