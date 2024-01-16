import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

import { getClient } from '../utils/localClient';
import { Product } from '../types/Product';

const localClient = getClient('cartStorage');

type CartItem = {
  product: Product,
  quantity: number,
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: localClient.init([] as CartItem[]),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Product>) {
      const productIndx = state.items
        .findIndex(item => item.product.itemId === action.payload.itemId);

      if (productIndx === -1) {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.items[productIndx].quantity += 1;// eslint-disable-line no-param-reassign
      }

      localClient.write(current(state).items);
    },
    take(state, action: PayloadAction<Product>) {
      const productIndx = state.items
        .findIndex(item => item.product.itemId === action.payload.itemId);

      if (productIndx === -1) {
        return;
      }

      const newQuantity = state.items[productIndx].quantity - 1;

      if (newQuantity > 0) {
        state.items[productIndx].quantity = newQuantity;// eslint-disable-line no-param-reassign
      } else {
        state.items.splice(productIndx, 1);
      }

      localClient.write(current(state).items);
    },
    remove(state, action: PayloadAction<Product>) {
      state.items = state.items// eslint-disable-line no-param-reassign
        .filter(item => item.product.itemId !== action.payload.itemId);

      localClient.write(current(state).items);
    },
    clean(state) {
      state.items = [];// eslint-disable-line no-param-reassign

      localClient.write(current(state).items);
    },
  },
});

export const {
  add, take, remove, clean,
} = cartSlice.actions;
export default cartSlice.reducer;
