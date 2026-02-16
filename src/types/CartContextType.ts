import type { Product } from './Product';

export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  isInCart: (product: Product) => boolean;
  clearCart: () => void;
  getQuantity: (product: Product) => number;
  setQuantity: (product: Product, quantity: number) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  isInFavorites: (product: Product) => boolean;
  clearFavorites: () => void;
}
