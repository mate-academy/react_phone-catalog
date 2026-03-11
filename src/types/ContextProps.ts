import { Category } from './Category';
import { Product } from './Product';

export interface ContextProps {
  categories: Category[];
  products: Product[];
  favorites: string[];
  toggleFavorite: (productId: string) => void;
}
