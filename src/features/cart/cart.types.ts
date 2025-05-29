import { NormalizedProduct } from 'shared/helpers/normalizeProductType';

export type CartItem = {
  product: NormalizedProduct;
  quantity: number;
};

export type CartState = {
  cartItems: CartItem[];
};
