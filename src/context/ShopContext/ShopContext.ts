import { createContext } from 'react';
import { Product } from '../../modules/shared/types/Product';
import { CartItem } from '../../modules/shared/types/CartItem';

type ShopContextValue = {
  cartItems: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: number) => boolean;
  isFavorite: (productId: number) => boolean;
};

export const ShopContext = createContext<ShopContextValue | null>(null);
