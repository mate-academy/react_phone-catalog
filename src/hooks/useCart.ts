import { useAppState } from '../store/Store';

export const useCart = () => {
  const { cartItems } = useAppState();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = cartItems.length;

  return { cartItems, totalCount, totalItems };
};
