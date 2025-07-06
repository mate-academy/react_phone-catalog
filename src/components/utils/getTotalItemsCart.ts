import { CartItem } from '../../features/CartSlice';

export const getTotalItemsCart = (products: CartItem[]) =>
  products.reduce((sum, item) => sum + item.quantity, 0);
