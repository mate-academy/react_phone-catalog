import { useMemo } from 'react';
import { useGlobalState } from '../store/GlobalStateProvider';
import { Product } from '../types/Product';

export const useCart = () => {
  const { state, dispatch } = useGlobalState();

  const items = state.cart.items;

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return {
    items: items,
    add: (product: Product) =>
      dispatch({ type: 'ADD_TO_CART', payload: product }),

    clearCart: () => dispatch({ type: 'CLEAR_CART' }),

    remove: (id: number) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),

    changeQty: (id: number, quantity: number) =>
      dispatch({ type: 'CHANGE_QUANTITY', payload: { id, quantity } }),

    totalQuantity,
    totalAmount,
  };
};
