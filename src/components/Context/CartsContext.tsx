import React, { useEffect, useMemo, useState } from 'react';
import { CartItem } from '../../types/CartItem';

type CartsContextType = {
  carts: CartItem[];
  setCarts: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartsContext = React.createContext<CartsContextType>({
  carts: [],
  setCarts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartsProvider: React.FC<Props> = ({ children }) => {
  const [carts, setCarts] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts));
  }, [carts]);

  const value = useMemo(
    () => ({
      carts,
      setCarts,
    }),
    [carts],
  );

  return (
    <CartsContext.Provider value={value}>{children}</CartsContext.Provider>
  );
};
