/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AddToCard } from '../../Types/AddToCard';

type CartState = {
  totalPrice: number;
  items: AddToCard[];
};

const initialState:CartState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capasity === action.payload.capasity,
      );

      if (!findItem) {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capasity === action.payload.capasity,
      );

      state.items = state.items.filter(item => item !== findItem);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    increaseItems(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capasity === action.payload.capasity,
      );

      if (findItem) {
        findItem.count += 1;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    decreaseItem(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.capasity === action.payload.capasity,
      );

      if (findItem) {
        findItem.count -= 1;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const {
  addItems, removeItem, increaseItems, decreaseItem,
} = cartSlice.actions;
export default cartSlice.reducer;
