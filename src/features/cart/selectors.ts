import { RootState } from '../../app/store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string) => (state: RootState) => {
  state.cart.cartItems.find((item) => item.itemInCart.itemId === id);
};
