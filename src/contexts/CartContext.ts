import { createContext } from 'react';
import { Product } from '../types/Product';
import { Store } from '../types/Store';

type Context = {
  cart: Store[],
  addCard: (product: Product) => void;
  delCard: (cardName: string) => void;
  changeCardCount: (id: number, newCount: number) => void;
};

export const CartContext = createContext<Context>({
  cart: [],
  addCard: () => {},
  delCard: () => {},
  changeCardCount: () => {},
});
