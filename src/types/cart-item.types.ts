import { ProductType } from './product.types';

export interface CartItemType {
  id: string;
  quantity: number;
  product: ProductType;
}
