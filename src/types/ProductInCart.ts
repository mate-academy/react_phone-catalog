import { Product } from './Product';

export interface ProductInCart {
  id: string;
  product: Product;
  quantity: number;
}
