/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'immer';
import { Product } from '../types/Product';

const data = localStorage.getItem('cart');

const initialState: Product[] = data === null ? [] : JSON.parse(data);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (items, action: PayloadAction<Product>) => {
      items.push(action.payload);
    },
    takeItems: (items, action: PayloadAction<Product>) => {
      return items.filter(e => e.id !== action.payload.id);
    },
    takeItem: (items, action: PayloadAction<string>) => {
      const index = items.map(item => item.id).lastIndexOf(action.payload);

      items.splice(index, 1);
    },
    clear: () => {
      return [];
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;
