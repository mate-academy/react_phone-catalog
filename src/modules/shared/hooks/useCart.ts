import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../../features/cart/cartSlice';
import type { Product } from '../../../types/product';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectCartTotalPrice);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  const add = (product: Product) => dispatch(addToCart(product));
  const remove = (itemId: string) => dispatch(removeFromCart(itemId));
  const clear = () => dispatch(clearCart());

  return {
    cartItems,
    totalAmount,
    totalQuantity,
    add,
    remove,
    clear,
  };
};
