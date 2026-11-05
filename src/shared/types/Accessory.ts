import { Category } from './Category';
import type { ProductDetails } from './ProductDetails';

export interface Accessory extends ProductDetails {
  category: typeof Category.ACCESSORIES;
}
