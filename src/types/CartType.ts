import { Product } from './Product';

export type CartType = Pick<Product, 'image' | 'phoneId' | 'name' | 'price'> & {
  quantity: number,
};
