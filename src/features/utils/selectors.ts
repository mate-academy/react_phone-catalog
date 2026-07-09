import { RootState } from '../../app/store';

export const cartItemsCount = (state: RootState) =>
  state.cartList.items.reduce((acc, item) => acc + item.quantity, 0);
