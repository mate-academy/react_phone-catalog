import { createContext } from 'react';

import { CartContextType } from './types/CartContextType';

export const CartContext = createContext<CartContextType>({
  cart: {},
  isModal: false,
  addItem: () => {},
  getIsInCart: () => false,
  removeItem: () => {},
  setIsModal: () => {},
  setCart: () => {},
});
