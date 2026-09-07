import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type CartItem = {
  product: Product;
  quantity: number;
};

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.find(
        item => item.product.id === action.payload.id,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      return state.filter(item => item.product.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.find(i => i.product.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
