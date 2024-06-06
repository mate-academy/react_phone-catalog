import { CartItemType } from './CartItemType';
import { Product } from './Product';

export interface State {
  favorites: Product[];
  cart: CartItemType[];
}
