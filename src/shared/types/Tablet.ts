import { Category } from './Category';
import type { ProductDetails } from './ProductDetails';

export interface Tablet extends ProductDetails {
  category: typeof Category.TABLETS;
  camera: string;
  zoom: string;
}
