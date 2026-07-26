import { RootState } from '../store';

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
