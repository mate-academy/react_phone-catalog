import { CartProduct } from './CartProduct';

export type CartProducts = {
  [productId: string]: CartProduct;
};
