import { Product } from './Product';
import { CartItemType } from './CartItemType';

export interface CartType {
  cart: CartItemType[];
  handleCart: (product: Product) => void;
  handleProductQuantity: (id: string, quantity: number, action: string) => void;
}
