import { useCartStorage } from '../utils/hooks/Storage/useCartStorage';
import { createContext, ReactNode } from 'react';

type CartContextType = ReturnType<typeof useCartStorage>;

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const data = useCartStorage();

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
