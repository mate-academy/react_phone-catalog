import { BaseProduct } from './Product';

export interface CartItem extends BaseProduct {
  quantity: number;
  itemUniqueId: string;
}

export interface CartState {
  items: CartItem[];
}
