import { ProductType } from './product.types';

export interface FavoritesContextType {
  favorites: ProductType[];
  toggleFavorite: (product: ProductType) => void;
  isFavorites: (productId: string) => boolean;
  clearFavorites: () => void;
}
