import { Product } from './Product';

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartList: { [id: string]: CartProduct } | null;
  setCartList: (cartList: { [id: string]: CartProduct } | null) => void;
}
