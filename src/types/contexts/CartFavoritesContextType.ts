import { ProductForCard } from '../Product/Product';

export type CartFavoritesContextType = {
  cart: ProductForCard[];
  favorites: ProductForCard[];
  addToCart: (product: ProductForCard) => void;
  addToFavorites: (product: ProductForCard) => void;
  removeFromCart: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  isInCart: (productId: number) => boolean;
  isInFavorites: (productId: number) => boolean;
};
