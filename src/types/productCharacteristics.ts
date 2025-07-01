import { Product } from './product';
import { ProductDetails } from './productDetails';

export interface ProductCharacteristics {
  key: keyof Product | keyof ProductDetails;
  name: string;
}
