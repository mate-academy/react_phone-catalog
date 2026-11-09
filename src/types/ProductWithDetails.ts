import { Product } from './Product';
import { ProductDetails } from './ProductDetails';

export interface ProductWithDetails {
  product: Product;
  details: ProductDetails;
}
