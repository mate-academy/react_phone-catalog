/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Iphone } from '../types/Iphone';
import { CartItemFromReducer } from '../types/CartItem';

type CartState = {
  totalPrice: number;
  items: CartItemFromReducer[];
};

const loadFromLocalStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);

  return localStorageData ? JSON.parse(localStorageData) : [];
};

export const saveToLocalStotage = (
  data: Iphone[] | CartItemFromReducer[], LOCAL_STORAGE_KEY: string,
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
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
    },

    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count -= 1;
      }

      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      saveToLocalStotage(state.items, LOCAL_STORAGE_KEY_CART);
    },
  },
});

export const {
  addItem,
  removeItem,
  minusItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
