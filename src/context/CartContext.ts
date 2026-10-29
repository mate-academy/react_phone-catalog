import { createContext, useContext } from 'react';
import type { Product } from '../types/Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  isInCart: (itemId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, change: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
