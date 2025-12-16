import { CartItemType } from './CartItemType';

export type CartContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;

  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  addItem: (item: CartItemType) => void;
};
