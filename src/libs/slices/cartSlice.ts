/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../types';
import { saveToLocalSotrage } from '../utils';

export interface ICartState {
  items: ICartItem[],
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      setItems: (state, action: PayloadAction<ICartItem[]>) => {
        state.items = action.payload;
        saveToLocalSotrage('cartItems', state.items);
      },
      addItem: (state, action: PayloadAction<ICartItem>) => {
        state.items.push(action.payload);
        saveToLocalSotrage('cartItems', state.items);
      },
      deleteItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(el => el.id !== action.payload);
        saveToLocalSotrage('cartItems', state.items);
      },
      setQuantity: (
        state,
        action: PayloadAction<Omit<ICartItem, 'product'>>,
      ) => {
        const currentItem = state.items.find(i => i.id === action.payload.id);

        if (currentItem) {
          currentItem.quantity = action.payload.quantity;
        }

        saveToLocalSotrage('cartItems', state.items);
      },
    },
  },
);

export const {
  setItems,
  addItem,
  deleteItem,
  setQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
