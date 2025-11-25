import { Product } from './Product';

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
