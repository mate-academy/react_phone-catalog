import { Product } from './Product';

export interface Store {
  id: number;
  product: Product;
  count: number;
}
