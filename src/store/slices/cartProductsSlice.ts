import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

const initialState: Product[] = [];

const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.find(p => p.id === action.payload.id);

      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      return state.filter(p => p.id !== action.payload.id);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartProductsSlice.actions;
export default cartProductsSlice.reducer;
