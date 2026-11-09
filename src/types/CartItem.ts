import { Product } from './Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clearCart: () => void;
}
