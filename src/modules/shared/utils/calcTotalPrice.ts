import type { CartProduct } from "../types/Product";

export const calcTotalPrice = (items: CartProduct[]) => {
  return items.reduce((sum, item) => item.quantity * item.price + sum, 0);
};