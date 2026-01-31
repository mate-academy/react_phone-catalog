import { Phone } from './Phone';

export interface CartItem {
  phone: Phone;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (phone: Phone) => void;
  removeFromCart: (phoneId: string) => void;
  increaseQuantity: (phoneId: string) => void;
  decreaseQuantity: (phoneId: string) => void;
}
