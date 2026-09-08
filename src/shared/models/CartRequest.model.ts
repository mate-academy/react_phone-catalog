import { Product } from './Product.model';
import { ShortProduct } from './ShortProduct.model';

export interface CartAddRequest {
  product: Product | ShortProduct;
  quantity: number;
}
