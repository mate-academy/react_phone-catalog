import {
  selectCartTotal,
  selectTotalQuantity,
} from '@store/features/cart/cart.slice';

import { useAppSelector } from './typedHooks';

export const useCart = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const totalPrice = useAppSelector(selectCartTotal);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const cartCount = cartItems.length;

  return { cartItems, cartCount, totalPrice, totalQuantity };
};
