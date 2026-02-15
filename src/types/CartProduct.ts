import { ProductDetails } from './ProductDetails';

export type CartProduct = {
  id: string;
  product: ProductDetails;
  quantity: number;
};
