import { CartItemType } from './CartItemType';

export type CartContextType = {
  cartItems: CartItemType[];
  total: number;
  count: number;

  addItem: (item: CartItemType) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};
