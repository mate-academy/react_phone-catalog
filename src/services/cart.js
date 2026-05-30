import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload);

      if (!existingItem) {
        state.push({ id: action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) =>
      state.filter(product => product.id !== action.payload),

    clearCart: () => {
      return [];
    },

    increment(state, action) {
      const item = state.find(p => p.id === action.payload);

      if (item) {
        item.quantity++;
      }
    },

    decrement(state, action) {
      const item = state.find(p => p.id === action.payload);

      if (item) {
        item.quantity--;
      }
    },
  },
});

export const { addProduct, removeProduct, clearCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
