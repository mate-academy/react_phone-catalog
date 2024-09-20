import { Category } from './Category';
import { ProductSpecs } from './ProductSpecs';
import { ProductSummary } from './ProductSummary';

export interface States {
  products: ProductSummary[];
  productSpecs: ProductSpecs[];
  cart: ProductSummary[];
  favorites: ProductSummary[];
  categories: Category[];
  isMenuOpen: boolean;
  isReady: boolean;
  totalCartItems: number;
  selectedProduct: ProductSpecs | undefined;
}
