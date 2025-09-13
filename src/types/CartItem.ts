import { Product } from './ProductPreview';

export type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};
