import { Phone } from './Phone';

export interface FavoritesContextType {
  favorites: Phone[];
  addToFavorites: (phone: Phone) => void;
  removeFromFavorites: (phone: Phone) => void;
}
