import { CartItemType } from '../../../modules/Cart/types/CartItemType';
import { CartType } from './CartType';

export interface CartContextType {
  cart: CartType;
  isModal: boolean;
  getIsInCart: (itemId: string) => boolean;
  addItem: (id: string, props?: CartItemType) => void;
  removeItem: (id: string, deleteAll: boolean) => void;
  setIsModal: (value: boolean) => void;
  setCart: (value: CartType) => void;
}
