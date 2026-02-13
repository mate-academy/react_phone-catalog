import { Product } from './Product';

export interface States {
  cart: Product[];
  favorites: Product[];
  isMenuOpen: boolean;
  isReady: boolean;
  totalCartItems: number;
  selectedProduct: Product | undefined;
}
