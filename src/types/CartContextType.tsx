import { CartItem } from './CartItem';
import { Product } from './Product';

export type CartContextType = {
  cartProducts: CartItem[],
  setCartProducts: (products: CartItem[]) => void,
  handleCount: (productId: string, sign: string) => void,
  removeItem: (productId: string) => void,
  totalPrice: number,
  noItems: boolean,
  setNoItems: (value: boolean) => void,
  addToCart: (product: Product) => void,
};
