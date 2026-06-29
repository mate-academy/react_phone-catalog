import { Products } from './Products';

export type FavItem = { id: string; quantity: number; product: Products };
export type FavState = { items: FavItem[] }; // store ids
export type FavAction =
  | { type: 'ADD'; payload: Products }
  | { type: 'REMOVE'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'CLEAR' };
export type FavContextType = {
  items: FavItem[];
  addToFav: (p: Products) => void;
  removeFromFav: (id: string) => void;
  clearFav: () => void;
  isInFav: (id: string) => boolean;
  totalFavourites: number;
};
