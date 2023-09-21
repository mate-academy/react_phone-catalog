/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItemType';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';
import { saveToLocalStotage } from '../../utils/saveToLocalStotage';

type CartState = {
  totalPrice: number;
  items: CartItemType[];
};

export const LOCAL_STORAGE_KEY_CART = 'cart';

const initialState: CartState = {
  items: loadFromLocalStorage(LOCAL_STORAGE_KEY_CART),
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count -= 1;
      }

      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = calcTotalPrice(state.items);
      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
    },

    initializeCart: (state, action) => {
      state.items = action.payload;
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const {
  addItem,
  removeItem,
  minusItem,
  clearItems,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
