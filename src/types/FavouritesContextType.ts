import { FavState } from '../store/FavouritesContext';
import { ProdCard } from './Product';

export type FavouriteContextType = {
  state: FavState;
  toggleFav: (product: ProdCard) => void;
};
