import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../types';

export const cartAdapter = createEntityAdapter<Product, string>({
  selectId: product => product.itemId,
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addToCart: cartAdapter.addOne,
    removeFromCart: cartAdapter.removeOne,
    clearCart: cartAdapter.removeAll,
    setCart: cartAdapter.setAll,
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
