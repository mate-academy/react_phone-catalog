import React, { createContext, useState } from 'react';
import { CartCard } from '../types/Card';

export interface CartType {
  cartCards: CartCard[];
  setCartCards: (cards: CartCard[]) => void;
}

export const CartContext = createContext<CartType>({
  cartCards: [],
  setCartCards: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartCards, setCartCards] = useState<CartCard[]>([]);

  return (
    <CartContext.Provider
      value={{
        cartCards: cartCards,
        setCartCards: (newCards: CartCard[]) => setCartCards(newCards),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
