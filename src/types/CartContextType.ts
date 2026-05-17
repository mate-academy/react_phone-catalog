import { CartIt, CartState } from '../store/CartContext';
import { ProdCard } from './Product';

export type CartContextType = {
  getTotalPrice: (items: CartIt[]) => number;
  getTotalItems: (items: CartIt[]) => number;
  getTotalItemPrice: (item: CartIt) => number;
  addToCard: (product: ProdCard) => void;
  submitCart: () => void;
  state: CartState;
};
