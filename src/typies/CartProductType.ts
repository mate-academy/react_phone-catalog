import { Product } from './Product';

export interface CartProductType {
  id: number;
  quantity: number;
  product: Product;
}
