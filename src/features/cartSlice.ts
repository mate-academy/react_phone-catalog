import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../types/ProductItem';
import { localClient } from '../helpers/localClient';

export interface CartState {
  items: ProductItem[];
}

const initialState: CartState = {
  items: localClient.read('cart') || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductItem>) => {
      const existingItem
        = state.items.find(item => item.id === action.payload.id);

      if (existingItem && existingItem.amount) {
        existingItem.amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },

    addAmount: (state, action: PayloadAction<ProductItem>) => {
      const item
        = state.items.find(stateItem => stateItem.id === action.payload.id);

      if (item && item.amount !== undefined) {
        item.amount += 1;
      }
    },

    removeAmount: (state, action: PayloadAction<ProductItem>) => {
      const item
        = state.items.find(stateItem => stateItem.id === action.payload.id);

      if (item && item.amount && item.amount > 0) {
        item.amount -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<ProductItem>) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  addAmount,
  removeItem,
  removeAmount,
} = cartSlice.actions;
