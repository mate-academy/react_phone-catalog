import { createContext, useState } from 'react';
import { CardType } from '../types/Card';

export interface ProductContextType {
  cards: CardType[];
  setCards: (cards: CardType[]) => void;
}

export const ProductContext = createContext<ProductContextType>({
  cards: [],
  setCards: () => {},
});

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cards, setCards] = useState<CardType[]>([]);

  return (
    <ProductContext.Provider
      value={{
        cards: cards,
        setCards: (crds: CardType[]) => setCards(crds),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
