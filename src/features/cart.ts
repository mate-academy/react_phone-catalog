/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
const initialState = {
  items: [] as Product[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        item => item.itemId === action.payload.itemId,
      );

      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
    setQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const item = state.items.find(i => i.itemId === action.payload.itemId);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, deleteFromCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
