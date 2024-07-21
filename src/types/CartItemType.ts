import { ProductInfo } from './ProductInfo';

export type CartItemType = {
  id: string;
  quantity: number;
  product: ProductInfo;
};
