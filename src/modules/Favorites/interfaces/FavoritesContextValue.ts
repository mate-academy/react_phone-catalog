import { Product } from '../../Catalog/interfaces/Product';

export interface FavoritesContextValue {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
}
