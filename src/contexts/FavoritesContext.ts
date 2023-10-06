import { createContext } from 'react';
import { Product } from '../types/Product';
import { Store } from '../types/Store';

type Context = {
  favorites: Store[],
  setFavorite: (product: Product) => void;
  delFavorite: (cardName: string) => void;
};

export const FavoritesContext = createContext<Context>({
  favorites: [],
  setFavorite: () => {},
  delFavorite: () => {},
});
