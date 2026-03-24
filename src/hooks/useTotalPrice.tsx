import { useCart } from './useCart';

export const useTotalPrice = () => {
  const { cart } = useCart();

  return cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};
