import { CartProduct } from '../types/cartProduct';
import { useAppContext } from './useAppContext';

export const useCart = () => {
  const { state, dispatch } = useAppContext();

  const addToCart = (item: CartProduct) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const changeQuantity = (id: string, quantity: number) => {
    dispatch({
      type: 'CHANGE_QUANTITY',
      payload: {
        id,
        quantity,
      },
    });
  };

  const resetCart = () => {
    dispatch({ type: 'RESET_CART' });
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    resetCart,
  };
};
