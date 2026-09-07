import { CartItemType } from '../../../modules/Cart/types/CartItemType';

export interface CartType {
  [key: string]: CartItemType;
}
