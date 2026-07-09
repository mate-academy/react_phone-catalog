import { Category } from './Category';
import { Product } from './Product';

export interface ContextProps {
  categories: Category[];
  products: Product[];
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  cart: { id: string; quantity: number }[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
}
