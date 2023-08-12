import { Product } from './Product';

export interface ProductForCart {
  id: string;
  quantity: number;
  product: Product;
}
