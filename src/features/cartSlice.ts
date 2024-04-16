import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';

export interface CartState {
  cart: ProductDetails[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductDetails>) => {
      const itemIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex < 0) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductDetails['id']>) => {
      const index = state.cart.findIndex(item => item.id === action.payload);

      if (index >= 0) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
