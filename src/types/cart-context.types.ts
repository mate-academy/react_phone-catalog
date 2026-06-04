import { CartItemType } from './cart-item.types';
import { ProductType } from './product.types';

export interface CartContextType {
  cart: CartItemType[];
  cartCount: number;
  addToCart: (product: ProductType, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
}
