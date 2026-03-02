import { createContext } from 'react';
import { BaseProduct } from '@/types/Product';
import { CartItem } from '@/types/Cart';

export interface AppContextValue {
  cartItems: CartItem[];
  addToCart: (product: BaseProduct) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: (product: BaseProduct) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isInCart: (product: BaseProduct) => boolean;

  favorites: string[];
  toggleFavorite: (product: BaseProduct) => void;
  isFavorite: (productId: string) => boolean;
  favoritesCount: number;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
