import { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart;
export const selectCartQuantity = (state: RootState) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);
