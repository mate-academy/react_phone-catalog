import { Products } from './Products';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type CartItem = { id: string; quantity: number; product: Products };
export type CartState = { items: CartItem[] };
export type CartAction =
  | { type: 'ADD'; payload: Products }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CHANGE_QTY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR' };
export type CartContextType = {
  items: CartItem[];
  addToCart: (p: Products) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalQuantity: number;
  totalPrice: number;
};
