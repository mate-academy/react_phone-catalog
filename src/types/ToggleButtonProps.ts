import { Product } from './Product';

export interface ToggleButtonProps {
  product: Product;
  type: 'cart' | 'favorites';
  isActive: boolean;
  onClick: () => void;
}
