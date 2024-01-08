import { Product } from './Product';

export type FavoritesContextType = {
  favoritesItems: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: Product['id']) => void;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: Product['id']) => void;
  incrementQuantity: (productId: Product['id']) => void;
  decrementQuantity: (productId: Product['id']) => void;
  appliedQuery: string;
  totalCartCount: number;
  totalPrice: number;
};
