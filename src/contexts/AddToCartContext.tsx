import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartProduct } from '../types/CartProduct';

interface AddToCartContextType {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export const AddToCartContext = React.createContext<AddToCartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AddToCartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart],
  );

  return (
    <AddToCartContext.Provider value={value}>
      {children}
    </AddToCartContext.Provider>
  );
};
