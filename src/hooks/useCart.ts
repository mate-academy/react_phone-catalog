import { useAppSelector } from './typedHooks';

export const useCart = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const hasCartProduct = cartItems.length;

  return { cartItems, hasCartProduct };
};
