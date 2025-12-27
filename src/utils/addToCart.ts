import { useContext } from 'react';
import { Product } from '../types/Product';
import { DispatchContext, StateContext } from '../Store/Store';

export const useAddToCartButton = () => {
  const dispatch = useContext(DispatchContext);
  const { cart } = useContext(StateContext);

  const handleAddToCartButton = (product: Product) => {
    if (cart.some(prod => prod.id === product.id)) {
      dispatch({ type: 'deleteFromCart', payload: product });
    } else {
      dispatch({ type: 'addToCart', payload: product });
    }
  };

  return { cart, handleAddToCartButton };
};
