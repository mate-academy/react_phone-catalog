import { RootState } from '@src/app/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsCart = (state: RootState, itemId: string) =>
  selectCartItems(state).some(item => item.product.itemId === itemId);
