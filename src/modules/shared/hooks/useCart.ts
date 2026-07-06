//#region imports
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  add,
  clear,
  decreaseQuantity,
  increaseQuantity,
  remove,
} from '../../../store/slices/cartSlice';
import { Product } from '../types/Product';
//#endregion

export const useCart = (id: string, product?: Product) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(state => state.cart);
  const isInCart = cart.some(item => item.id === id);

  const toggleCart = () => {
    if (isInCart) {
      dispatch(remove(id));
    } else if (product) {
      dispatch(add(product));
    }
  };

  return {
    isInCart,
    toggleCart,
    removeFromCart: () => dispatch(remove(id)),
    clearCart: () => dispatch(clear()),
    increase: () => dispatch(increaseQuantity(id)),
    decrease: () => dispatch(decreaseQuantity(id)),
  };
};
