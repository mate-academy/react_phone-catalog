import { createContext } from 'react';
import { Product } from '../../utils/types/Product';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalPrice: number;
  totalCount: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
