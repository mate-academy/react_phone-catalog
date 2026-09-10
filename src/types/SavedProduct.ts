import { CartProduct } from './CartProduct';
import { Product } from './Product';

export interface SavedProduct extends CartProduct {
  product: Product;
}
