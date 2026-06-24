import { ProductCart } from './ProductCart';

export interface CartContextType {
  cartItems: ProductCart[];
  addToCart: (product: Omit<ProductCart, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}
