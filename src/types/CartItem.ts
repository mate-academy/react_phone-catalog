import { ProductItem } from './ProductItem';

export interface CartItem extends ProductItem {
  amount: number;
}
