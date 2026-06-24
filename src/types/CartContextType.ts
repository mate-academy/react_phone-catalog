import { Product } from './Product';
export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addToFavorites: (product: Product) => void;
  changeQuantity: (id: number, action: 'plus' | 'minus') => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  isInFavorites: (id: number) => boolean;
}
