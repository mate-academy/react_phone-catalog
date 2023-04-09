import { Cart } from './Cart';

export interface ProductsContextType {
  cartList: Cart[],
  setCartList: (val: Cart[]) => void,
}
