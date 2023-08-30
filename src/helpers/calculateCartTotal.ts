import { Product } from '../types/Product';

export const calculateCartTotal = (
  cartItems: Product[],
  category: 'quantity' | 'amount',
) => {
  return cartItems.reduce((total, { quantity, price }) => (
    category === 'quantity'
      ? total + quantity
      : total + price * quantity
  ), 0);
};
