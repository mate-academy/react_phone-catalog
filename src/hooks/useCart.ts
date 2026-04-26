import { useContext } from 'react';
import { CartDispatchContext, CartItem } from '../contexts/cart';
import { ProductPreview } from '../types';

export const useCart = () => {
  const dispatch = useContext(CartDispatchContext);

  const addToCart = (product: ProductPreview) => {
    const newCartItem: CartItem = {
      product: product,
      quantity: 1,
    };

    dispatch({ type: 'add', payload: newCartItem });
  };

  const removeFromCart = (product: ProductPreview) => {
    dispatch({ type: 'remove', payload: product.id });
  };

  const updateCart = (cartItem: CartItem, change: string) => {
    if (change === '+') {
      dispatch({
        type: 'update',
        payload: {
          id: cartItem.product.id,
          changes: { quantity: cartItem.quantity + 1 },
        },
      });
    }

    if (change === '-') {
      dispatch({
        type: 'update',
        payload: {
          id: cartItem.product.id,
          changes: { quantity: cartItem.quantity - 1 },
        },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'clear' });
  };

  return {
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
  };
};
