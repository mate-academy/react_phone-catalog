import { RootState } from '../../app/store';

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartQuantity = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = (state: RootState) =>
  state.cart.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
