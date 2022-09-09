import React, { useMemo, useState } from 'react';
import { StorageItem } from '../../Helpers/types/StorageItem';

type CartContextType = {
  cart: number,
  setCart: React.Dispatch<React.SetStateAction<number>>
};

type Props = {
  children: React.ReactNode,
};

export const CartContext = React.createContext<CartContextType>({
  cart: 0,
  setCart: () => {},
});

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const storage = localStorage.getItem('CartItems');
  const parsedStorage = storage
    ? JSON.parse(storage)
    : [];

  const amount = parsedStorage.reduce((a: number, b: StorageItem) => {
    return a + b.quantity;
  }, 0);

  const [cart, setCart] = useState<number>(amount);

  const contextValue = useMemo(() => {
    return {
      cart,
      setCart,
    };
  }, [cart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
