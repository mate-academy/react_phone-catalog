import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* import { ProductDetails } from '../types/ProductDetails'; */
import { Product } from '../types/Product';

export interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (itemIndex < 0) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.cart.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
