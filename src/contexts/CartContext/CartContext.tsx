import React, { useMemo } from 'react';
import { CartProduct } from '../../types/products';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface CartProductsContextType {
  cartProducts: CartProduct[];
  setCartProducts: (newValue: CartProduct[]) => void;
}

export const CartContext = React.createContext<CartProductsContextType>({
  cartProducts: [],
  setCartProducts: () => {},
} as CartProductsContextType);

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>(
    'cart',
    [],
  );
  const value = useMemo(
    () => ({
      cartProducts,
      setCartProducts,
    }),
    [cartProducts, setCartProducts],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
