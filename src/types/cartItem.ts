import { Product } from './product';

export type CartItem = {
  id: string;
  quantity: number;
  product: Pick<Product, 'itemId' | 'image' | 'price' | 'name'>;
};
