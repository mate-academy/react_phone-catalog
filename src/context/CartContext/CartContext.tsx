import { createContext } from 'react';
import { CartItem } from '../../types/CartItem';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product | ProductDetails) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
