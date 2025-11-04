import { Product } from './Product';

export type CartElement = {
  id: string;
  quantity: number;
  product: Pick<Product, 'name' | 'image' | 'price'>;
};
