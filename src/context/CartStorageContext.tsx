import { createContext } from 'react';
import { CartProduct } from '../types/CartProduct';

type ContextType = {
  cartItems: CartProduct[];
  setCartItems: ((valueToSave: CartProduct[]) => void) | null;
  handleAddToCart: ((addedValue: CartProduct) => void) | null;
  getTotalPrice: () => number;
  getTotalCartItems: (() => number) | null;
};

export const CartStorageContext = createContext<ContextType>({
  cartItems: [],
  setCartItems: null,
  handleAddToCart: null,
  getTotalPrice: () => 0,
  getTotalCartItems: () => 0,
});
