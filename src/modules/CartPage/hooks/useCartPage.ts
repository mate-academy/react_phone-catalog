import { useMemo } from 'react';
import { useCart } from '../../../contexts/CartContext';

export const useCartPage = () => {
  const { state } = useCart();

  const totalPrice = useMemo(() => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [state.items]);

  const totalQuantity = useMemo(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const isEmpty = state.items.length === 0;

  return {
    items: state.items,
    totalPrice,
    totalQuantity,
    isEmpty,
  };
};
