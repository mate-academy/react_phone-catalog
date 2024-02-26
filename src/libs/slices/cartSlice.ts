/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../types';
import { saveToLocalSotrage } from '../utils';

export interface ICartState {
  cartItems: ICartItem[],
}

const initialState: ICartState = {
  cartItems: [],
};

const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      setItems: (state, action: PayloadAction<ICartItem[]>) => {
        state.cartItems = action.payload;
        saveToLocalSotrage('cartItems', state.cartItems);
      },
      addItem: (state, action: PayloadAction<ICartItem>) => {
        state.cartItems.push(action.payload);
        saveToLocalSotrage('cartItems', state.cartItems);
      },
      deleteItem: (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(
          el => el.id !== action.payload,
        );
        saveToLocalSotrage('cartItems', state.cartItems);
      },
      setQuantity: (
        state,
        action: PayloadAction<Omit<ICartItem, 'product'>>,
      ) => {
        const currentItem = state.cartItems.find(
          el => el.id === action.payload.id,
        );

        if (currentItem) {
          currentItem.quantity = action.payload.quantity;
        }

        saveToLocalSotrage('cartItems', state.cartItems);
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
