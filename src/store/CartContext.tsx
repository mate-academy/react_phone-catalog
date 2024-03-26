import React, { useState, useMemo } from 'react';
import { LSCart } from '../helpers/LSCart';

export const CartContext = React.createContext<{
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
}>({
  cartQuantity: 0,
  setCartQuantity: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(
    LSCart.getTotalCartQuantity(),
  );

  const value = useMemo(
    () => ({
      cartQuantity,
      setCartQuantity,
    }),
    [cartQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
