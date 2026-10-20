import type { CartItem } from './CartItem';
import type { Product } from './Product';

export type CartContextType = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  isInCart: (productId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
};
