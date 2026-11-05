import { Category } from './Category';
import type { ProductDetails } from './ProductDetails';

export interface Phone extends ProductDetails {
  category: typeof Category.PHONES;
  camera: string;
  zoom: string;
}
