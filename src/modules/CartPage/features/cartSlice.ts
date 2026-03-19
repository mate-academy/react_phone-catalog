import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { CartProduct, Product } from '../../../types';

export const cartAdapter = createEntityAdapter<CartProduct, string>({
  selectId: cartItem => cartItem.itemId,
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      cartAdapter.addOne(state, { ...action.payload, quantity: 1 });
    },
    removeFromCart: cartAdapter.removeOne,
    changeQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload;

      if (quantity > 0) {
        cartAdapter.updateOne(state, { id: itemId, changes: { quantity } });
      }
    },
    clearCart: cartAdapter.removeAll,
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
