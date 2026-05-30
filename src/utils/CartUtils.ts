import { CartProduct } from '../components/type/Product';

export const totalQuantity = (cartItems: CartProduct[]): number => {
  return cartItems.reduce((total: number, item: CartProduct) => {
    if (item && item.quantity) {
      return total + item.quantity;
    }

    return total;
  }, 0);
};
