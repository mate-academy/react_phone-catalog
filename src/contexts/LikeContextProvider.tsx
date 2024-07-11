import React, { createContext, useState } from 'react';
import { CardType } from '../types/Card';

export interface CartType {
  likeCards: CardType[];
  setLikeCards: (cards: CardType[]) => void;
}

export const LikeContext = createContext<CartType>({
  likeCards: [],
  setLikeCards: () => {},
});

export const LikeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartCards, setCartCards] = useState<CardType[]>([]);

  return (
    <LikeContext.Provider
      value={{
        likeCards: cartCards,
        setLikeCards: (newCards: CardType[]) => setCartCards(newCards),
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
