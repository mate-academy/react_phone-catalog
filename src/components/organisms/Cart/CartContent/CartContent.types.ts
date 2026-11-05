import type { CartItem } from '@/entities/cart';
import type { Product } from '@/shared/types';

export type CartContentData = {
  items: CartItem[];
  cartProducts: (Product & { quantity: number })[];
  isError: boolean;
  isPending: boolean;
};
