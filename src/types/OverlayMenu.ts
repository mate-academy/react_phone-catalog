import { CartItemProps } from './CartItemProps';
import { Product } from './Product';

export interface OverlayMenuProps {
  isMenuOpen: boolean;
  toggleIsMenuOpen: () => void;
  favoritesIconSrc: string;
  favorites: Product[];
  cartIconSrc: string;
  cart: CartItemProps[];
}
