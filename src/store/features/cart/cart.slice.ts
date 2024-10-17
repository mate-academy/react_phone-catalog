/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from 'utils/types/cart.interface';

export interface InitialState {
  items: ICartItem[];
}
const initialState: InitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, { payload: product }) => {
      const existingItem = state.items.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        state.items = state.items.filter(
          item => item.product.id !== existingItem.product.id,
        );
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    deleteCart: (state, { payload: id }) => {
      state.items = state.items.filter(item => item.product.id !== id);
    },
    toggleCart: (state, { payload: { id, actionType } }) => {
      const existingItem = state.items.find(item => item.product.id === id);

      if (existingItem) {
        if (actionType === 'add') {
          existingItem.quantity++;
        } else if (actionType === 'delete' && existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(item => item.product.id !== id);
        }
      }
    },
    checkoutItems: state => {
      state.items = [];
    },
  },
});

export const selectCartTotal = createSelector(
  (state: { cart: InitialState }) => state.cart.items,
  items =>
    items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
);

export const selectTotalQuantity = createSelector(
  (state: { cart: InitialState }) => state.cart.items,
  items => items.reduce((total, item) => total + item.quantity, 0),
);

export default cartSlice.reducer;
export const { addCart, deleteCart, toggleCart, checkoutItems } =
  cartSlice.actions;
