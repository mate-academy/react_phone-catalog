import { CartItem } from './cartItem';
import { Phone } from './phone';

export interface State {
  cartItems: CartItem[];
  totalCost: number;
  favoriteItems: Phone[];
}
