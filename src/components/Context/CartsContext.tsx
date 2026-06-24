import React, { useEffect, useMemo, useState } from 'react';
import { CartItem } from '../../types/CartItem';

type CartsContextType = {
  carts: CartItem[];
  setCarts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
  totalPrice: number;
};

export const CartsContext = React.createContext<CartsContextType>({
  carts: [],
  setCarts: () => {},
  totalItems: 0,
  totalPrice: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartsProvider: React.FC<Props> = ({ children }) => {
  const [carts, setCarts] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalItems = useMemo(
    () => carts.reduce((sum, item) => sum + item.quantity, 0),
    [carts],
  );

  const totalPrice = useMemo(
    () => carts.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [carts],
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts));
  }, [carts]);

  const value = useMemo(
    () => ({
      carts,
      setCarts,
      totalItems,
      totalPrice,
    }),
    [carts, totalItems, totalPrice],
  );

  return (
    <CartsContext.Provider value={value}>{children}</CartsContext.Provider>
  );
};
