import { ProductItem } from './ProductItem';

export interface CartList {
  count: number | string,
  item: ProductItem;
}
